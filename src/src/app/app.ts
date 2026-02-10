import { Component, inject, signal } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { WeatherService } from './services/weather-service';
import Weather from './types/weather';
import { lastValueFrom } from 'rxjs';
import { CoordinatesPicker } from "./components/coordinates-picker/coordinates-picker";
import { CurrentForecast } from "./components/current-forecast/current-forecast";
import { HourlyForecast } from "./components/hourly-forecast/hourly-forecast";
import { WeeklyForecast } from "./components/weekly-forecast/weekly-forecast";
import { Footer } from "./components/footer/footer";
import Coordinates from './types/coordinates';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatCard, CoordinatesPicker, CurrentForecast, HourlyForecast, WeeklyForecast, Footer],
  template: `
    <mat-card style="max-width: 600px; margin: 2rem auto; padding: 1rem;">
      <h2>お天気アプリ</h2>
      <app-coordinates-picker (coordinatesSelected)="onCoordinatesSelected($event)" />
      @if (weather()) {
        <app-current-forecast [current]="weather()!.current" />
        <app-hourly-forecast [hourly]="weather()!.hourly" />
        <app-weekly-forecast [daily]="weather()!.daily" />
      }
      <app-footer />
    </mat-card>
  `,
})
export class App {
  weather = signal<Weather | null>(null);

  private weatherService = inject(WeatherService);

  async onCoordinatesSelected(coordinates: Coordinates | null) {
    this.weather.set(null);
    if (!coordinates) return;
    const result = await lastValueFrom(
      this.weatherService.getCurrentWeather(coordinates.latitude, coordinates.longitude)
    );
    this.weather.set(result);
  }
}
