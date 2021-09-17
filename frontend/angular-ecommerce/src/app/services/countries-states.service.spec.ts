import { TestBed } from '@angular/core/testing';

import { CountriesStatesService } from './countries-states.service';

describe('CountriesStatesService', () => {
  let service: CountriesStatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountriesStatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
