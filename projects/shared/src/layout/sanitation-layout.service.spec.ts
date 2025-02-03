import { TestBed } from '@angular/core/testing';

import { SanitationLayoutService } from './sanitation-layout.service';

describe('SanitationLayoutService', () => {
  let service: SanitationLayoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SanitationLayoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
