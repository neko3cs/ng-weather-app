import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurrentForecast } from './current-forecast';
import { registerLocaleData } from '@angular/common';
import localeJa from '@angular/common/locales/ja';

describe('CurrentForecast', () => {
  let component: CurrentForecast;
  let fixture: ComponentFixture<CurrentForecast>;

  beforeEach(async () => {
    registerLocaleData(localeJa);

    await TestBed.configureTestingModule({
      imports: [CurrentForecast]
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

  it('should render weather table data', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    // Check some specific content
    const textContent = compiled.textContent;
    expect(textContent).toContain('現在の天気');
    expect(textContent).toContain('現在気温');
    expect(textContent).toContain('20 ℃');
    expect(textContent).toContain('最高気温');
    expect(textContent).toContain('25 ℃');
    expect(textContent).toContain('日の出');
    expect(textContent).toContain('2026/02/03 06:00');
  });
});
