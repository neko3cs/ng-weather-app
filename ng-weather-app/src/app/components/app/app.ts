import { Component, inject, signal } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { WeatherService } from '../../services/weather-service';
import Weather from '../../types/weather';
import { lastValueFrom } from 'rxjs';
import { CoordinatesPicker } from "../coordinates-picker/coordinates-picker";
import { WeatherResult } from "../weather-result/weather-result";
import Coordinates from '../../types/coordinates';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatCard, CoordinatesPicker, WeatherResult],
  template: `
    <mat-card style="max-width: 400px; margin: 2rem auto; padding: 1rem;">
      <h2>お天気アプリ</h2>
      <app-coordinates-picker (coordinatesSelected)="onCoordinatesSelected($event)" />
      @if (weather()) {
        <app-weather-result [weather]="weather()!" style="margin-top: 1rem;" />
      }
    </mat-card>
  `,
})
export class App {
  weather = signal<Weather | null>(null);

  private weatherService = inject(WeatherService);

  async onCoordinatesSelected(coordinates: Coordinates) {
    this.weather.set(null);
    const result = await lastValueFrom(
      this.weatherService.getCurrentWeather(coordinates.latitude, coordinates.longitude)
    );
    this.weather.set(result);
  }
}
