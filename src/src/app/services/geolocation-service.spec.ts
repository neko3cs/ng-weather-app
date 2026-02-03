import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GeolocationService } from './geolocation-service';

describe('GeolocationService', () => {
  let service: GeolocationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GeolocationService]
    });
    service = TestBed.inject(GeolocationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get location by city name', () => {
    const mockResponse = [{ lat: '35.6895', lon: '139.6917', display_name: 'Tokyo' }];

    service.getLocationByCityName('Tokyo').subscribe(data => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(request => request.url.includes('nominatim.openstreetmap.org/search'));
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should return current location from navigator.geolocation', async () => {
    const mockCoords = {
      latitude: 35.6895,
      longitude: 139.6917,
      accuracy: 0,
      altitude: null,
      altitudeAccuracy: null,
      heading: null,
      speed: null
    };
    const mockPosition = {
      coords: mockCoords,
      timestamp: Date.now()
    };

    // Mock the navigator.geolocation object directly
    const originalGeolocation = (window.navigator as any).geolocation;
    const mockGeolocation = {
      getCurrentPosition: vi.fn().mockImplementation((success: any) => {
        success(mockPosition as GeolocationPosition);
      })
    };
    Object.defineProperty(window.navigator, 'geolocation', {
      value: mockGeolocation,
      configurable: true,
      writable: true
    });

    const coords = await service.getCurrentLocation();
    expect(coords.latitude).toBe(35.6895);
    expect(coords.longitude).toBe(139.6917);
    
    // Restore
    Object.defineProperty(window.navigator, 'geolocation', {
      value: originalGeolocation,
      configurable: true,
      writable: true
    });
  });
});
