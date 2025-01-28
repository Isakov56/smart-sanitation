import { TestBed } from '@angular/core/testing';

import { TesPageService } from './tes-page.service';

describe('TesPageService', () => {
  let service: TesPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TesPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
