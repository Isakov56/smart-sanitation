import { TestBed } from '@angular/core/testing';

import { XmaintIdentityService } from './xmaint-identity.service';

describe('XmaintIdentityService', () => {
  let service: XmaintIdentityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XmaintIdentityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
