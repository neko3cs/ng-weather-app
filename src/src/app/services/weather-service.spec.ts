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
      current_weather: { temperature: 20, windspeed: 10, weathercode: 0, time: '2026-02-10T10:00' },
      hourly: {
        time: ['2026-02-10T10:00'],
        relativehumidity_2m: [50],
        temperature_2m: [20],
        precipitation: [0],
        weathercode: [0]
      },
      daily: {
        time: ['2026-02-10'],
        temperature_2m_max: [25],
        temperature_2m_min: [15],
        precipitation_sum: [0],
        snowfall_sum: [0],
        sunrise: ['2026-02-10T06:00'],
        sunset: ['2026-02-10T18:00'],
        weathercode: [0]
      }
    };

    service.getCurrentWeather(35, 139).subscribe(weather => {
      expect(weather.current.temperature).toBe(20);
      expect(weather.current.maxTemp).toBe(25);
      expect(weather.current.minTemp).toBe(15);
      expect(weather.current.humidity).toBe(50);
      expect(weather.hourly.length).toBe(1);
      expect(weather.daily.length).toBe(1);
    });

    const req = httpMock.expectOne(request => request.url.includes('api.open-meteo.com'));
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
