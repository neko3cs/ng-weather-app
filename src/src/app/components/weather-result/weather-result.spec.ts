import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherResult } from './weather-result';

describe('WeatherResult', () => {
  let component: WeatherResult;
  let fixture: ComponentFixture<WeatherResult>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherResult]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherResult);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
