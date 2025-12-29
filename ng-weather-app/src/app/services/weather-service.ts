import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import Weather from '../types/weather';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private http = inject(HttpClient);

  getCurrentWeather(lat: number, lon: number) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
    return this.http.get<{ current_weather: Weather }>(url);
  }
}
