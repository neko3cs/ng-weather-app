import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeeklyForecast } from './weekly-forecast';
import { registerLocaleData } from '@angular/common';
import localeJa from '@angular/common/locales/ja';

describe('WeeklyForecast', () => {
  let component: WeeklyForecast;
  let fixture: ComponentFixture<WeeklyForecast>;

  beforeEach(async () => {
    registerLocaleData(localeJa);

    await TestBed.configureTestingModule({
      imports: [WeeklyForecast]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeeklyForecast);
    component = fixture.componentInstance;
    
    component.daily = [
      {
        date: '2026-02-10',
        maxTemp: 25,
        minTemp: 15,
        precipitationSum: 0,
        snowfallSum: 0,
        weatherCode: 0
      },
      {
        date: '2026-02-11',
        maxTemp: 22,
        minTemp: 12,
        precipitationSum: 5,
        snowfallSum: 0,
        weatherCode: 1
      }
    ];
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render daily forecast table', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const rows = compiled.querySelectorAll('tr');
    // 1 header row + 2 data rows
    expect(rows.length).toBe(3);
    
    const textContent = compiled.textContent;
    expect(textContent).toContain('02/10');
    expect(textContent).toContain('25 / 15');
    expect(textContent).toContain('02/11');
    expect(textContent).toContain('22 / 12');
    expect(textContent).toContain('5mm');
  });
});
