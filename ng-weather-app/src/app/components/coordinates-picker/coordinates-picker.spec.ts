import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinatesPicker } from './coordinates-picker';

describe('CoordinatesPicker', () => {
  let component: CoordinatesPicker;
  let fixture: ComponentFixture<CoordinatesPicker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoordinatesPicker]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoordinatesPicker);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
