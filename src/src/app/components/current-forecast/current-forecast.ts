import { formatDate } from '@angular/common';
import { Component, Input } from '@angular/core';
import Weather from '../../types/weather';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-current-forecast',
  standalone: true,
  imports: [MatIconModule],
  template: `
    @if (current) {
      <div class="current-forecast-container">
        <h3>現在の天気</h3>
        
        <div class="main-temp-section">
          <div class="current-temp">
            {{ current.temperature }}<span class="unit">℃</span>
          </div>
          <div class="hi-lo-temp">
            <span class="max">
              <mat-icon>arrow_upward</mat-icon>{{ current.maxTemp ?? '不明' }}℃
            </span>
            <span class="divider">/</span>
            <span class="min">
              <mat-icon>arrow_downward</mat-icon>{{ current.minTemp ?? '不明' }}℃
            </span>
          </div>
        </div>

        <div class="details-grid">
          <div class="detail-item">
            <mat-icon color="primary">opacity</mat-icon>
            <div class="detail-content">
              <span class="label">湿度</span>
              <span class="value">{{ current.humidity ?? '不明' }}%</span>
            </div>
          </div>
          <div class="detail-item">
            <mat-icon color="primary">umbrella</mat-icon>
            <div class="detail-content">
              <span class="label">降水量</span>
              <span class="value">{{ current.precipitation ?? '不明' }}mm</span>
            </div>
          </div>
          <div class="detail-item">
            <mat-icon color="primary">ac_unit</mat-icon>
            <div class="detail-content">
              <span class="label">積雪量</span>
              <span class="value">{{ current.snowfall ?? '不明' }}cm</span>
            </div>
          </div>
          <div class="detail-item">
            <mat-icon color="primary">air</mat-icon>
            <div class="detail-content">
              <span class="label">風速</span>
              <span class="value">{{ current.windSpeed }}km/h</span>
            </div>
          </div>
        </div>

        <div class="sun-times">
          <div class="sun-item">
            <mat-icon style="color: #ffa000">wb_sunny</mat-icon>
            <span>日の出: {{ formatSunTime(current.sunrise) }}</span>
          </div>
          <div class="sun-item">
            <mat-icon style="color: #5c6bc0">wb_twilight</mat-icon>
            <span>日の入り: {{ formatSunTime(current.sunset) }}</span>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .current-forecast-container {
      margin-top: 1rem;
      padding: 1.5rem;
      border-radius: 12px;
      background: var(--mat-sys-surface-container-low, #f5f5f5);
    }
    h3 {
      margin-top: 0;
      font-size: 1rem;
      font-weight: 500;
      color: var(--mat-sys-on-surface-variant);
      margin-bottom: 1rem;
    }
    .main-temp-section {
      text-align: center;
      margin: 1rem 0 2rem;
    }
    .current-temp {
      font-size: 4.5rem;
      font-weight: 300;
      line-height: 1;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      color: var(--mat-sys-on-surface);
    }
    .current-temp .unit {
      font-size: 1.5rem;
      margin-top: 1rem;
      margin-left: 0.2rem;
    }
    .hi-lo-temp {
      font-size: 1.2rem;
      margin-top: 0.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      color: var(--mat-sys-on-surface-variant);
    }
    .hi-lo-temp mat-icon {
      font-size: 1.2rem;
      width: 1.2rem;
      height: 1.2rem;
      vertical-align: middle;
      margin-right: -2px;
    }
    .max { color: #f44336; font-weight: 500; }
    .min { color: #2196f3; font-weight: 500; }
    .divider { opacity: 0.3; }

    .details-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
      margin-bottom: 2rem;
    }
    .detail-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.75rem;
      background: var(--mat-sys-surface, white);
      border-radius: 10px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }
    .detail-content {
      display: flex;
      flex-direction: column;
    }
    .detail-item mat-icon {
      font-size: 1.5rem;
      width: 1.5rem;
      height: 1.5rem;
      opacity: 0.8;
    }
    .label {
      font-size: 0.75rem;
      color: var(--mat-sys-on-surface-variant);
      margin-bottom: 2px;
    }
    .value {
      font-weight: 600;
      font-size: 1rem;
    }

    .sun-times {
      display: flex;
      justify-content: space-around;
      padding-top: 1.5rem;
      border-top: 1px solid var(--mat-sys-outline-variant, #e0e0e0);
      font-size: 0.95rem;
      color: var(--mat-sys-on-surface-variant);
    }
    .sun-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .sun-item mat-icon {
      font-size: 1.3rem;
      width: 1.3rem;
      height: 1.3rem;
    }
  `]
})
export class CurrentForecast {
  @Input({ required: true }) current!: Weather['current'];

  formatSunTime(time: string | null) {
    if (!time) return '不明';
    return formatDate(new Date(time), 'HH:mm', 'ja-JP');
  }
}
