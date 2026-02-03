import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WeatherService } from './weather-service';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherService]
    });
    service = TestBed.inject(WeatherService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch weather data and map it correctly', () => {
    const mockResponse = {
      current_weather: { temperature: 20, windspeed: 10 },
      hourly: {
        relativehumidity_2m: [50],
        temperature_2m: [20],
        precipitation: [0]
      },
      daily: {
        temperature_2m_max: [25],
        temperature_2m_min: [15],
        precipitation_sum: [0],
        snowfall_sum: [0],
        sunrise: ['2026-02-03T06:00'],
        sunset: ['2026-02-03T18:00'],
        wind_speed_10m_max: [15]
      }
    };

    service.getCurrentWeather(35, 139).subscribe(weather => {
      expect(weather.temperature).toBe(20);
      expect(weather.maxTemp).toBe(25);
      expect(weather.minTemp).toBe(15);
      expect(weather.humidity).toBe(50);
    });

    const req = httpMock.expectOne(request => request.url.includes('api.open-meteo.com'));
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
