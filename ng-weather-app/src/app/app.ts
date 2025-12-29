import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, MatCardModule],
  template: `
      <mat-card style="max-width: 400px; margin: 2rem auto; padding: 1rem;">
      <h2>お天気アプリ</h2>

      <button mat-raised-button color="primary" (click)="getCurrentLocation()">
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
    </mat-card>
  `,
})
export class App {
  locationText = signal('');
  message = signal('');

  readonly http = inject(HttpClient);

  getCurrentLocation(): void {
    this.message.set('位置情報を取得中...');

    if (!navigator.geolocation) {
      this.message.set('このブラウザはGeolocation APIに対応していません');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude.toFixed(6);
        const lon = position.coords.longitude.toFixed(6);

        this.http.get(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`).subscribe({
          next: (data: any) => {
            this.locationText.set(`${data.address.city}`);
            this.message.set('取得成功');
          },
          error: (error) => {
            this.message.set('位置情報の取得に失敗しました');
          }
        });
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            this.message.set('位置情報の使用が許可されませんでした');
            break;
          case error.POSITION_UNAVAILABLE:
            this.message.set('位置情報を取得できません');
            break;
          case error.TIMEOUT:
            this.message.set('位置情報の取得がタイムアウトしました');
            break;
          default:
            this.message.set('不明なエラーが発生しました');
        }
      }
    );
  }
}
