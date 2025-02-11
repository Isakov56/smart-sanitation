import { TestBed } from '@angular/core/testing';

import { XmaintNgrxStoreLibService } from './xmaint-ngrx-store-lib.service';

describe('XmaintNgrxStoreLibService', () => {
  let service: XmaintNgrxStoreLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XmaintNgrxStoreLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
