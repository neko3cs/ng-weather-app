import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';
import { WeatherService } from './services/weather-service';
import { of } from 'rxjs';
import { registerLocaleData } from '@angular/common';
import localeJa from '@angular/common/locales/ja';

describe('App', () => {
  let fixture: ComponentFixture<App>;
  let component: App;
  let weatherServiceMock: any;

  beforeEach(async () => {
    registerLocaleData(localeJa);
    
    weatherServiceMock = {
      getCurrentWeather: vi.fn().mockReturnValue(of({
        current: {
          temperature: 20,
          windSpeed: 10,
          humidity: 50,
          maxTemp: 25,
          minTemp: 15,
          precipitation: 0,
          snowfall: 0,
          sunrise: '2026-02-03T06:00',
          sunset: '2026-02-03T18:00',
          weatherCode: 0
        },
        hourly: [],
        daily: []
      }))
    };

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        { provide: WeatherService, useValue: weatherServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', async () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('お天気アプリ');
  });

  it('should render coordinates picker', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-coordinates-picker')).toBeTruthy();
  });

  it('should render footer', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-footer')).toBeTruthy();
  });

  it('should call weather service when coordinates are selected', async () => {
    const coords = { latitude: 35, longitude: 139 };
    await component.onCoordinatesSelected(coords);
    
    expect(weatherServiceMock.getCurrentWeather).toHaveBeenCalledWith(35, 139);
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-current-forecast')).toBeTruthy();
    expect(compiled.querySelector('app-hourly-forecast')).toBeTruthy();
    expect(compiled.querySelector('app-weekly-forecast')).toBeTruthy();
  });
});
