import { TestBed } from '@angular/core/testing';

import { XmaintCoreLibService } from './xmaint-core-lib.service';

describe('XmaintCoreLibService', () => {
  let service: XmaintCoreLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XmaintCoreLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
