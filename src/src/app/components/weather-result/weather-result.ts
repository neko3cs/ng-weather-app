import { formatDate } from '@angular/common';
import { Component, computed, Input, signal, Signal } from '@angular/core';
import Weather from '../../types/weather';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-weather-result',
  standalone: true,
  imports: [
    MatTableModule,
  ],
  template: `
    <table mat-table [dataSource]="rows()" class="mat-elevation-z0">
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
  `,
})
export class WeatherResult {
  @Input({ required: true }) weather!: Weather;

  rows = computed<({ label: string, value: string })[]>(() => {
    if (!this.weather) {
      return [];
    }
    return [
      { label: '現在気温', value: `${this.weather.temperature ?? '不明'} ℃` },
      { label: '最高気温', value: `${this.weather.maxTemp ?? '不明'} ℃` },
      { label: '最低気温', value: `${this.weather.minTemp ?? '不明'} ℃` },
      { label: '湿度', value: `${this.weather.humidity ?? '不明'} %` },
      { label: '降水量', value: `${this.weather.precipitation ?? '不明'} mm` },
      { label: '積雪量', value: `${this.weather.snowfall ?? '不明'} cm` },
      { label: '風速', value: `${this.weather.windSpeed ?? '不明'} km/h` },
      { label: '日の出', value: this.weather.sunrise ? formatDate(new Date(this.weather.sunrise), 'yyyy/MM/dd HH:mm', 'ja-JP') : '不明' },
      { label: '日の入り', value: this.weather.sunset ? formatDate(new Date(this.weather.sunset), 'yyyy/MM/dd HH:mm', 'ja-JP') : '不明' },
    ];
  });
}
