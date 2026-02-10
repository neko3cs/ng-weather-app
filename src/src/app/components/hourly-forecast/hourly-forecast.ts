import { formatDate, CommonModule } from '@angular/common';
import { Component, Input, computed } from '@angular/core';
import Weather from '../../types/weather';

@Component({
  selector: 'app-hourly-forecast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="margin-top: 1rem;">
      <h3>1時間ごとの天気</h3>
      <div style="display: flex; overflow-x: auto; gap: 1rem; padding-bottom: 0.5rem;">
        @for (item of filteredHourly(); track item.time) {
          <div style="flex: 0 0 auto; text-align: center; border: 1px solid #ccc; padding: 0.5rem; border-radius: 4px; min-width: 80px;">
            <div style="font-size: 0.8rem;">{{ formatTime(item.time) }}</div>
            <div style="font-weight: bold; margin: 0.2rem 0;">{{ item.temperature }}℃</div>
            <div style="font-size: 0.7rem; color: #666;">湿度: {{ item.humidity }}%</div>
            <div style="font-size: 0.7rem; color: #666;">降水: {{ item.precipitation }}mm</div>
          </div>
        }
      </div>
    </div>
  `,
})
export class HourlyForecast {
  @Input({ required: true }) hourly!: Weather['hourly'];

  filteredHourly = computed(() => {
    const now = new Date();
    // Round down to the current hour
    now.setMinutes(0, 0, 0);
    now.setSeconds(0, 0);
    return this.hourly.filter(item => new Date(item.time) >= now);
  });

  formatTime(time: string) {
    return formatDate(new Date(time), 'HH:mm', 'ja-JP');
  }
}
