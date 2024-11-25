import { TestBed } from '@angular/core/testing';

import { ChartsLibService } from './charts-lib.service';

describe('ChartsLibService', () => {
  let service: ChartsLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartsLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
