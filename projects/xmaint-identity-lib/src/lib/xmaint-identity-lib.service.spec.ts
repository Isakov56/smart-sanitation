import { TestBed } from '@angular/core/testing';

import { XmaintIdentityLibService } from './xmaint-identity-lib.service';

describe('XmaintIdentityLibService', () => {
  let service: XmaintIdentityLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XmaintIdentityLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
