import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { GeolocationService } from '../../services/geolocation-service';
import { LocationNameService } from '../../services/location-name-service';
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import Coordinates from '../../types/coordinates';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-coordinates-picker',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, MatIconModule, MatProgressSpinnerModule, FormsModule],
  template: `
    <div style="width: 100%; margin-top: 1rem;">
      <button mat-raised-button color="primary" (click)="fetchCurrentLocation()" style="width: 100%;">
        現在地を取得
      </button>

      <mat-form-field appearance="outline" style="width: 100%; margin-top: 1rem;">
        <input matInput [value]="locationText()" placeholder="都市名を入力"
              (input)="locationText.set($event.target.value)" (keyup.enter)="search()" />
      </mat-form-field>

      <div style="text-align: center;">
        <button mat-raised-button color="accent" (click)="search()" style="width: 100%;">
          <mat-icon>search</mat-icon>
          検索
        </button>
      </div>

      @if (isLoading()) {
        <div style="text-align: center; margin-top: 1rem; display: flex; justify-content: center; align-items: center;">
          <mat-progress-spinner diameter="30" mode="indeterminate" />
        </div>
      }
      @if (message()) {
        <div style="text-align: center; margin-top: 1rem; ">
          <p>{{ message() }}</p>
        </div>
      }
    </div>
  `,
})
export class CoordinatesPicker {
  @Output() coordinatesSelected = new EventEmitter<Coordinates | null>();

  locationText = signal('');
  message = signal('');
  isLoading = signal(false);

  private geoService = inject(GeolocationService);
  private locService = inject(LocationNameService);

  async fetchCurrentLocation() {
    this.isLoading.set(true);
    try {
      this.locationText.set('');
      this.message.set('');

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
    finally {
      this.isLoading.set(false);
    }
  }

  async search() {
    if (!this.locationText().trim()) {
      this.message.set('都市名を入力してください');
      this.coordinatesSelected.emit(null);
      return;
    }
    this.isLoading.set(true);
    try {
      this.message.set('');
      const locationData: any = await lastValueFrom(
        this.geoService.getLocationByCityName(this.locationText().trim())
      );
      if (!locationData || !locationData[0]) {
        this.message.set('都市が見つかりませんでした');
        return;
      }
      this.coordinatesSelected.emit({
        latitude: parseFloat(locationData[0].lat),
        longitude: parseFloat(locationData[0].lon),
      });
    } catch (err) {
      this.message.set('都市情報の取得に失敗しました');
      return;
    }
    finally {
      this.isLoading.set(false);
    }
  }
}
