import { formatDate } from '@angular/common';
import { Component, Input } from '@angular/core';
import Weather from '../../types/weather';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-weekly-forecast',
  standalone: true,
  imports: [MatTableModule],
  template: `
    <div style="margin-top: 1.5rem;">
      <h3>週間天気</h3>
      <table mat-table [dataSource]="daily" class="mat-elevation-z0" style="width: 100%;">
        <ng-container matColumnDef="date">
          <th mat-header-cell *matHeaderCellDef>日付</th>
          <td mat-cell *matCellDef="let item">{{ formatDate(item.date) }}</td>
        </ng-container>

        <ng-container matColumnDef="temp">
          <th mat-header-cell *matHeaderCellDef>最高/最低</th>
          <td mat-cell *matCellDef="let item">{{ item.maxTemp }} / {{ item.minTemp }} ℃</td>
        </ng-container>

        <ng-container matColumnDef="precip">
          <th mat-header-cell *matHeaderCellDef>降水/積雪</th>
          <td mat-cell *matCellDef="let item">{{ item.precipitationSum }}mm / {{ item.snowfallSum }}cm</td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
      </table>
    </div>
  `,
})
export class WeeklyForecast {
  @Input({ required: true }) daily!: Weather['daily'];

  displayedColumns = ['date', 'temp', 'precip'];

  formatDate(date: string) {
    return formatDate(new Date(date), 'MM/dd(E)', 'ja-JP');
  }
}
