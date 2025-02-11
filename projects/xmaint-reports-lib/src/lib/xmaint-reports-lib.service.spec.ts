import { TestBed } from '@angular/core/testing';

import { XmaintReportsLibService } from './xmaint-reports-lib.service';

describe('XmaintReportsLibService', () => {
  let service: XmaintReportsLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XmaintReportsLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
