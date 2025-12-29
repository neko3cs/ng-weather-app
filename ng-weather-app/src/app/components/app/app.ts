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

      <button mat-raised-button color="primary" (click)="fetchByCurrentLocation()">
        現在地を取得
      </button>

      <div style="margin-top: 1rem;">
        <mat-form-field appearance="outline" style="width: 100%;">
          <input matInput placeholder="都市名を入力" [(ngModel)]="inputCity" />
        </mat-form-field>
        <button mat-raised-button color="accent" (click)="fetchByCity()">検索</button>
      </div>

      <div style="margin-top: 1rem;">
        <mat-form-field appearance="outline" style="width: 100%;">
          <input matInput [value]="locationText()" placeholder="現在地" readonly />
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

  inputCity = '';

  private geoService = inject(GeolocationService);
  private locService = inject(LocationNameService);
  private weatherService = inject(WeatherService);

  async fetchByCurrentLocation() {
    this.message.set('位置情報を取得中...');
    this.weather.set(null);

    try {
      const { lat, lon } = await this.geoService.getCurrentLocation();
      await this.fetchWeather(lat, lon);
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

  async fetchByCity() {
    if (!this.inputCity) {
      this.message.set('都市名を入力してください');
      return;
    }

    this.message.set('都市情報を取得中...');
    this.weather.set(null);

    try {
      const locData: any = await lastValueFrom(
        this.geoService.getLocationNameForQuery(this.inputCity)
      );

      if (!locData || !locData[0]) {
        this.message.set('都市が見つかりませんでした');
        return;
      }

      const lat = parseFloat(locData[0].lat);
      const lon = parseFloat(locData[0].lon);

      await this.fetchWeather(lat, lon);

    } catch (err) {
      this.message.set('都市情報の取得に失敗しました');
    }
  }

  private async fetchWeather(lat: number, lon: number) {
    try {
      const locData: any = await lastValueFrom(this.locService.getLocationName(lat, lon));
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
    } catch (err) {
      this.message.set('天気情報の取得に失敗しました');
    }
  }
}
