import { TestBed } from '@angular/core/testing';

import { TestStoreLibService } from './test-store-lib.service';

describe('TestStoreLibService', () => {
  let service: TestStoreLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestStoreLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
