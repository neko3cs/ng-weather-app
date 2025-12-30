import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { GeolocationService } from '../../services/geolocation-service';
import { LocationNameService } from '../../services/location-name-service';
import { WeatherService } from '../../services/weather-service';
import Weather from '../../types/weather';
import { lastValueFrom } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, MatCardModule, FormsModule],
  template: `
      <mat-card style="max-width: 400px; margin: 2rem auto; padding: 1rem;">
      <h2>お天気アプリ</h2>

      <button mat-raised-button color="primary" (click)="fetchCurrentLocation()">
        現在地を取得
      </button>

      <div style="margin-top: 1rem; display: flex; align-items: center; gap: 8px;">
        <mat-form-field appearance="outline" style="flex: 1;">
          <input matInput [value]="locationText()" placeholder="都市名を入力" (keyup.enter)="fetchWeather()" />
        </mat-form-field>
        <button mat-raised-button color="accent" (click)="fetchWeather()">検索</button>
      </div>

      <p>{{ message() }}</p>

      @if (weather(); as w) {
        <p>現在気温: {{ w.temperature }}℃</p>
        <p>天気コード: {{ w.weathercode }}</p>
      }
    </mat-card>
  `,
})
export class App {
  locationText = signal('');
  message = signal('');
  weather = signal<Weather | null>(null);

  private geoService = inject(GeolocationService);
  private locService = inject(LocationNameService);
  private weatherService = inject(WeatherService);

  async fetchCurrentLocation() {
    this.message.set('位置情報を取得中...');
    this.weather.set(null);

    try {
      const coordinates = await this.geoService.getCurrentLocation();
      const locationData: any = await lastValueFrom(this.locService.getLocationName(coordinates.latitude, coordinates.longitude));
      const city = locationData.address.city || locationData.address.town || locationData.address.village || '';
      this.locationText.set(`${city}`);
      this.message.set('');
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

  async fetchWeather() {
    if (!this.locationText().trim()) {
      this.message.set('都市名を入力してください');
      return;
    }
    this.weather.set(null);
    this.message.set('都市情報を取得中...');

    let latitude = 0;
    let longitude = 0;
    try {
      const locationData: any = await lastValueFrom(
        this.geoService.getLocationByCityName(this.locationText().trim())
      );
      if (!locationData || !locationData[0]) {
        this.message.set('都市が見つかりませんでした');
        return;
      }
      latitude = parseFloat(locationData[0].lat);
      longitude = parseFloat(locationData[0].lon);
    } catch (err) {
      this.message.set('都市情報の取得に失敗しました');
      return;
    }

    this.message.set('天気情報を取得中...');
    try {
      const weatherData = await lastValueFrom(
        this.weatherService.getCurrentWeather(latitude, longitude)
      );
      const current = weatherData?.current_weather;
      if (current) {
        this.weather.set(current);
        this.message.set('');
        return;
      } else {
        this.weather.set(null);
        this.message.set('天気情報が取得できませんでした');
        return;
      }
    } catch (err) {
      this.message.set('天気情報の取得に失敗しました');
      return;
    }
  }
}
