import { TestBed } from '@angular/core/testing';

import { XmaintMonitoringLibService } from './xmaint-monitoring-lib.service';

describe('XmaintMonitoringLibService', () => {
  let service: XmaintMonitoringLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XmaintMonitoringLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
