import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { HttpClient } from '@angular/common/http';
import Weather from '../../types/weather';
import { GeolocationService } from '../../services/geolocation-service';
import { LocationNameService } from '../../services/location-name-service';
import { WeatherService } from '../../services/weather-service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, MatCardModule],
  template: `
      <mat-card style="max-width: 400px; margin: 2rem auto; padding: 1rem;">
      <h2>お天気アプリ</h2>

      <button mat-raised-button color="primary" (click)="fetchLocationAndWeather()">
        現在地を取得
      </button>

      <div style="margin-top: 1rem;">
        <mat-form-field appearance="outline" style="width: 100%;">
          <input matInput
            [value]="locationText()"
            placeholder="現在地"
          />
        </mat-form-field>
      </div>

      <p>{{ message() }}</p>

      @if (weather()) {
        <p>現在気温: {{ weather()?.temperature }}℃</p>
        <p>天気コード: {{ weather()?.weathercode }}</p>
      }
    </mat-card>
  `,
})
export class App {
  locationText = signal('');
  message = signal('');
  weather = signal<Weather | null>(null);

  private readonly geolocationService = inject(GeolocationService);
  private readonly locationNameService = inject(LocationNameService);
  private readonly weatherService = inject(WeatherService);

  async fetchLocationAndWeather() {
    this.message.set('位置情報を取得中...');
    this.weather.set(null);

    try {
      const { lat, lon } = await this.geolocationService.getCurrentLocation();

      const locData: any = await lastValueFrom(this.locationNameService.getLocationName(lat, lon));
      const city = locData.address.city || locData.address.town || locData.address.village || '';
      const state = locData.address.state || '';
      this.locationText.set(`${state} ${city}`);

      const weatherData = await lastValueFrom(this.weatherService.getCurrentWeather(lat, lon));
      if (weatherData?.current_weather) {
        this.weather.set(weatherData.current_weather);
        this.message.set('取得成功');
      } else {
        this.message.set('天気情報が取得できませんでした');
      }

    } catch (err: any) {
      if (err.code) {
        switch (err.code) {
          case err.PERMISSION_DENIED:
            this.message.set('位置情報の使用が許可されませんでした');
            break;
          case err.POSITION_UNAVAILABLE:
            this.message.set('位置情報を取得できません');
            break;
          case err.TIMEOUT:
            this.message.set('位置情報の取得がタイムアウトしました');
            break;
          default:
            this.message.set('不明なエラーが発生しました');
        }
      } else {
        this.message.set(typeof err === 'string' ? err : '取得に失敗しました');
      }
    }
  }
}
