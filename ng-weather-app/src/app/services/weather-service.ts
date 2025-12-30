import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import Weather from '../types/weather';
import OpenMeteoResponse from '../types/open-meteo-response';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private http = inject(HttpClient);

  getCurrentWeather(lat: number, lon: number) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,snowfall_sum,sunrise,sunset,wind_speed_10m_max&hourly=relativehumidity_2m,temperature_2m,precipitation&timezone=Asia/Tokyo`;
    return this.http.get<OpenMeteoResponse>(url).pipe(
      map((res) => {
        const weather: Weather = {
          temperature: res.current_weather.temperature,
          humidity: res.hourly.relativehumidity_2m[0] ?? null,
          precipitation: res.hourly.precipitation[0] ?? null,
          snowfall: res.daily.snowfall_sum[0] ?? null,
          windSpeed: res.current_weather.windspeed,
          maxTemp: res.daily.temperature_2m_max[0] ?? null,
          minTemp: res.daily.temperature_2m_min[0] ?? null,
          sunrise: res.daily.sunrise[0] ?? null,
          sunset: res.daily.sunset[0] ?? null,
        };
        return weather;
      })
    );
  }
}
