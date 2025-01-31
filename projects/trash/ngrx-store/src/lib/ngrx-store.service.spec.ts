import { TestBed } from '@angular/core/testing';

import { NgrxStoreService } from './ngrx-store.service';

describe('NgrxStoreService', () => {
  let service: NgrxStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgrxStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
