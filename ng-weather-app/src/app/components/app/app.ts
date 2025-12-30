import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { GeolocationService } from '../../services/geolocation-service';
import { LocationNameService } from '../../services/location-name-service';
import { WeatherService } from '../../services/weather-service';
import Weather from '../../types/weather';
import { lastValueFrom } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { formatDate } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, MatCardModule, MatTableModule, FormsModule],
  template: `
      <mat-card style="max-width: 400px; margin: 2rem auto; padding: 1rem;">
      <h2>お天気アプリ</h2>

      <button mat-raised-button color="primary" (click)="fetchCurrentLocation()">
        現在地を取得
      </button>

      <div style="margin-top: 1rem;">
        <mat-form-field appearance="outline" style="width: 100%;">
          <input matInput [value]="locationText()" placeholder="都市名を入力" (keyup.enter)="fetchWeather()" />
        </mat-form-field>

        <div style="text-align: center; margin-top: 0.5rem;">
          <button mat-raised-button color="accent" (click)="fetchWeather()">検索</button>
        </div>
      </div>

      <p>{{ message() }}</p>

      @if (weather(); as w) {
        <table mat-table [dataSource]="weatherRows()" class="mat-elevation-z0">
          <ng-container matColumnDef="label">
            <td mat-cell *matCellDef="let row" style="  font-weight: 600; color: var(--mat-sys-on-surface); white-space: nowrap; padding-right: 1rem;">
              {{ row.label }}
            </td>
          </ng-container>
          <ng-container matColumnDef="value">
            <td mat-cell *matCellDef="let row" style="color: var(--mat-sys-on-surface-variant);">
              {{ row.value }}
            </td>
          </ng-container>
          <tr mat-row *matRowDef="let row; columns: ['label', 'value']"></tr>
        </table>
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

  weatherRows = computed<({ label: string, value: string })[]>(() => {
    const w = this.weather();
    if (!w) {
      return [];
    }
    return [
      { label: '現在気温', value: `${w.temperature ?? '不明'} ℃` },
      { label: '最高気温', value: `${w.maxTemp ?? '不明'} ℃` },
      { label: '最低気温', value: `${w.minTemp ?? '不明'} ℃` },
      { label: '湿度', value: `${w.humidity ?? '不明'} %` },
      { label: '降水量', value: `${w.precipitation ?? '不明'} mm` },
      { label: '積雪量', value: `${w.snowfall ?? '不明'} cm` },
      { label: '風速', value: `${w.windSpeed ?? '不明'} km/h` },
      { label: '日の出', value: w.sunrise ? formatDate(new Date(w.sunrise), 'yyyy/MM/dd HH:mm', 'ja-JP') : '不明' },
      { label: '日の入り', value: w.sunset ? formatDate(new Date(w.sunset), 'yyyy/MM/dd HH:mm', 'ja-JP') : '不明' },
    ];
  });

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
      if (weatherData) {
        this.weather.set(weatherData);
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
