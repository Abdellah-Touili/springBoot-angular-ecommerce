import { TestBed } from '@angular/core/testing';

import { MonthYearCardService } from './month-year-card.service';

describe('MonthYearCardService', () => {
  let service: MonthYearCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonthYearCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
