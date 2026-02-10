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
      <div class="mt-4 p-6 rounded-xl bg-(--mat-sys-surface-container-low,#f5f5f5)">
        <h3 class="mt-0 text-base font-medium text-(--mat-sys-on-surface-variant) mb-4">現在の天気</h3>
        
        <div class="text-center my-4 mb-8">
          <div class="text-[4.5rem] font-light leading-none flex justify-center items-start text-(--mat-sys-on-surface)">
            {{ current.temperature }}<span class="text-2xl mt-4 ml-1">℃</span>
          </div>
          <div class="text-xl mt-2 flex justify-center items-center gap-4 text-(--mat-sys-on-surface-variant)">
            <span class="text-[#f44336] font-medium flex items-center">
              <mat-icon class="text-xl! w-5! h-5! align-middle -mr-0.5">arrow_upward</mat-icon>{{ current.maxTemp ?? '不明' }}℃
            </span>
            <span class="opacity-30">/</span>
            <span class="text-[#2196f3] font-medium flex items-center">
              <mat-icon class="text-xl! w-5! h-5! align-middle -mr-0.5">arrow_downward</mat-icon>{{ current.minTemp ?? '不明' }}℃
            </span>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4 mb-8">
          <div class="flex items-center gap-4 p-3 bg-(--mat-sys-surface,white) rounded-lg shadow-sm">
            <mat-icon color="primary" class="text-2xl! w-6! h-6! opacity-80">opacity</mat-icon>
            <div class="flex flex-col">
              <span class="text-[0.75rem] text-(--mat-sys-on-surface-variant) mb-0.5">湿度</span>
              <span class="font-semibold text-base">{{ current.humidity ?? '不明' }}%</span>
            </div>
          </div>
          <div class="flex items-center gap-4 p-3 bg-(--mat-sys-surface,white) rounded-lg shadow-sm">
            <mat-icon color="primary" class="text-2xl! w-6! h-6! opacity-80">umbrella</mat-icon>
            <div class="flex flex-col">
              <span class="text-[0.75rem] text-(--mat-sys-on-surface-variant) mb-0.5">降水量</span>
              <span class="font-semibold text-base">{{ current.precipitation ?? '不明' }}mm</span>
            </div>
          </div>
          <div class="flex items-center gap-4 p-3 bg-(--mat-sys-surface,white) rounded-lg shadow-sm">
            <mat-icon color="primary" class="text-2xl! w-6! h-6! opacity-80">ac_unit</mat-icon>
            <div class="flex flex-col">
              <span class="text-[0.75rem] text-(--mat-sys-on-surface-variant) mb-0.5">積雪量</span>
              <span class="font-semibold text-base">{{ current.snowfall ?? '不明' }}cm</span>
            </div>
          </div>
          <div class="flex items-center gap-4 p-3 bg-(--mat-sys-surface,white) rounded-lg shadow-sm">
            <mat-icon color="primary" class="text-2xl! w-6! h-6! opacity-80">air</mat-icon>
            <div class="flex flex-col">
              <span class="text-[0.75rem] text-(--mat-sys-on-surface-variant) mb-0.5">風速</span>
              <span class="font-semibold text-base">{{ current.windSpeed }}km/h</span>
            </div>
          </div>
        </div>

        <div class="flex justify-around pt-6 border-t border-(--mat-sys-outline-variant,#e0e0e0) text-[0.95rem] text-(--mat-sys-on-surface-variant)">
          <div class="flex items-center gap-2">
            <mat-icon style="color: #ffa000" class="text-[1.3rem]! w-[1.3rem]! h-[1.3rem]!">wb_sunny</mat-icon>
            <span>日の出: {{ formatSunTime(current.sunrise) }}</span>
          </div>
          <div class="flex items-center gap-2">
            <mat-icon style="color: #5c6bc0" class="text-[1.3rem]! w-[1.3rem]! h-[1.3rem]!">wb_twilight</mat-icon>
            <span>日の入り: {{ formatSunTime(current.sunset) }}</span>
          </div>
        </div>
      </div>
    }
  `
})
export class CurrentForecast {
  @Input({ required: true }) current!: Weather['current'];

  formatSunTime(time: string | null) {
    if (!time) return '不明';
    return formatDate(new Date(time), 'HH:mm', 'ja-JP');
  }
}
