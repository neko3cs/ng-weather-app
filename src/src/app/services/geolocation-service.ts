import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import Coordinates from '../types/coordinates';

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  private readonly http = inject(HttpClient);

  getCurrentLocation(): Promise<Coordinates> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject('このブラウザはGeolocation APIに対応していません');
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = parseFloat(position.coords.latitude.toFixed(6));
          const lon = parseFloat(position.coords.longitude.toFixed(6));
          resolve({ latitude: lat, longitude: lon });
        },
        (error) => reject(error)
      );
    });
  }

  getLocationByCityName(cityName: string) {
    return this.http.get(`https://nominatim.openstreetmap.org/search?format=json&q=${cityName}`);
  }
}
