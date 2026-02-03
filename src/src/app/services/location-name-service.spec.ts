import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LocationNameService } from './location-name-service';

describe('LocationNameService', () => {
  let service: LocationNameService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LocationNameService]
    });
    service = TestBed.inject(LocationNameService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch location name', () => {
    const mockResponse = { display_name: 'Tokyo, Japan' };

    service.getLocationName(35, 139).subscribe(data => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(request => request.url.includes('nominatim.openstreetmap.org/reverse'));
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
