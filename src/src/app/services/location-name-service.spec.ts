import { TestBed } from '@angular/core/testing';

import { LocationNameService } from './location-name-service';

describe('LocationNameService', () => {
  let service: LocationNameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationNameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
