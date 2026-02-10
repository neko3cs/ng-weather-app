import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurrentForecast } from './current-forecast';
import { registerLocaleData } from '@angular/common';
import localeJa from '@angular/common/locales/ja';
import { MatIconModule } from '@angular/material/icon';

describe('CurrentForecast', () => {
  let component: CurrentForecast;
  let fixture: ComponentFixture<CurrentForecast>;

  beforeEach(async () => {
    registerLocaleData(localeJa);

    await TestBed.configureTestingModule({
      imports: [CurrentForecast, MatIconModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentForecast);
    component = fixture.componentInstance;
    
    component.current = {
      temperature: 20,
      maxTemp: 25,
      minTemp: 15,
      humidity: 50,
      precipitation: 0,
      snowfall: 0,
      windSpeed: 10,
      sunrise: '2026-02-03T06:00',
      sunset: '2026-02-03T18:00',
      weatherCode: 0
    };
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render weather data', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    const textContent = compiled.textContent;
    expect(textContent).toContain('現在の天気');
    expect(textContent).toContain('20');
    expect(textContent).toContain('25℃');
    expect(textContent).toContain('15℃');
    expect(textContent).toContain('50%');
    expect(textContent).toContain('0mm');
    expect(textContent).toContain('10km/h');
    expect(textContent).toContain('日の出: 06:00');
    expect(textContent).toContain('日の入り: 18:00');
  });

  it('should have icons', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const icons = compiled.querySelectorAll('mat-icon');
    expect(icons.length).toBeGreaterThan(0);
  });
});
