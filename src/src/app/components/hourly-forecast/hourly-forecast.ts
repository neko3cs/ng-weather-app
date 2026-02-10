import { formatDate, CommonModule } from '@angular/common';
import { Component, Input, computed } from '@angular/core';
import Weather from '../../types/weather';

@Component({
  selector: 'app-hourly-forecast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="mt-4">
      <h3 class="text-lg font-medium mb-4">1時間ごとの天気</h3>
      <div class="flex overflow-x-auto gap-4 pb-2">
        @for (item of filteredHourly(); track item.time) {
          <div class="flex-none text-center border border-gray-300 p-2 rounded min-w-[80px]">
            <div class="text-xs">{{ formatTime(item.time) }}</div>
            <div class="font-bold my-1 text-base">{{ item.temperature }}℃</div>
            <div class="text-[0.7rem] text-gray-600">湿度: {{ item.humidity }}%</div>
            <div class="text-[0.7rem] text-gray-600">降水: {{ item.precipitation }}mm</div>
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
    return this.hourly
      .filter(item => new Date(item.time) >= now)
      .slice(0, 24);
  });

  formatTime(time: string) {
    return formatDate(new Date(time), 'HH:mm', 'ja-JP');
  }
}
