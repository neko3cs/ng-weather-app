import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoordinatesPicker } from './coordinates-picker';
import { GeolocationService } from '../../services/geolocation-service';
import { LocationNameService } from '../../services/location-name-service';
import { of, throwError } from 'rxjs';

describe('CoordinatesPicker', () => {
  let component: CoordinatesPicker;
  let fixture: ComponentFixture<CoordinatesPicker>;
  let geoServiceMock: any;
  let locServiceMock: any;

  beforeEach(async () => {
    geoServiceMock = {
      getCurrentLocation: vi.fn(),
      getLocationByCityName: vi.fn()
    };
    locServiceMock = {
      getLocationName: vi.fn()
    };

    await TestBed.configureTestingModule({
      imports: [CoordinatesPicker],
      providers: [
        { provide: GeolocationService, useValue: geoServiceMock },
        { provide: LocationNameService, useValue: locServiceMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoordinatesPicker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a button for current location', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('button[color="primary"]');
    expect(button?.textContent).toContain('現在地を取得');
  });

  it('should call geoService and locService when fetching current location', async () => {
    const mockCoords = { latitude: 35.6895, longitude: 139.6917 };
    geoServiceMock.getCurrentLocation.mockResolvedValue(mockCoords);
    locServiceMock.getLocationName.mockReturnValue(of({ address: { city: 'Tokyo' } }));

    await component.fetchCurrentLocation();

    expect(geoServiceMock.getCurrentLocation).toHaveBeenCalled();
    expect(locServiceMock.getLocationName).toHaveBeenCalledWith(35.6895, 139.6917);
    expect(component.locationText()).toBe('Tokyo');
  });

  it('should emit coordinatesSelected when search is successful', async () => {
    const mockLocationData = [{ lat: '35.6895', lon: '139.6917' }];
    geoServiceMock.getLocationByCityName.mockReturnValue(of(mockLocationData));
    
    component.locationText.set('Tokyo');
    const spy = vi.spyOn(component.coordinatesSelected, 'emit');

    await component.search();

    expect(geoServiceMock.getLocationByCityName).toHaveBeenCalledWith('Tokyo');
    expect(spy).toHaveBeenCalledWith({ latitude: 35.6895, longitude: 139.6917 });
  });

  it('should show message when city is not found', async () => {
    geoServiceMock.getLocationByCityName.mockReturnValue(of([]));
    
    component.locationText.set('UnknownCity');
    await component.search();

    expect(component.message()).toBe('都市が見つかりませんでした');
  });
});
