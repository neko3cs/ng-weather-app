import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HourlyForecast } from './hourly-forecast';
import { registerLocaleData } from '@angular/common';
import localeJa from '@angular/common/locales/ja';

describe('HourlyForecast', () => {
  let component: HourlyForecast;
  let fixture: ComponentFixture<HourlyForecast>;

  beforeEach(async () => {
    registerLocaleData(localeJa);

    await TestBed.configureTestingModule({
      imports: [HourlyForecast]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HourlyForecast);
    component = fixture.componentInstance;
    
    const now = new Date();
    const past = new Date(now.getTime() - 3600000); // 1 hour ago
    const future = new Date(now.getTime() + 3600000); // 1 hour later
    
    component.hourly = [
      {
        time: past.toISOString(),
        temperature: 15,
        humidity: 60,
        precipitation: 0,
        weatherCode: 0
      },
      {
        time: now.toISOString(),
        temperature: 20,
        humidity: 50,
        precipitation: 0,
        weatherCode: 0
      },
      {
        time: future.toISOString(),
        temperature: 22,
        humidity: 45,
        precipitation: 0,
        weatherCode: 0
      }
    ];
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter out past hours', () => {
    expect(component.filteredHourly().length).toBe(2);
    expect(new Date(component.filteredHourly()[0].time).getHours()).toBe(new Date().getHours());
  });

  it('should render filtered hourly items', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const items = compiled.querySelectorAll('div > div > div');
    // Each hourly item has 4 divs inside (time, temp, humidity, precip) plus the container
    // Let's check based on the structure @for (item of filteredHourly(); ...)
    const forecastBoxes = compiled.querySelectorAll('div[style*="flex: 0 0 auto"]');
    expect(forecastBoxes.length).toBe(2);
    expect(forecastBoxes[0].textContent).toContain('20℃');
    expect(forecastBoxes[1].textContent).toContain('22℃');
  });
});
