import { TestBed } from '@angular/core/testing';

import { XmaintDashboardLibService } from './xmaint-dashboard-lib.service';

describe('XmaintDashboardLibService', () => {
  let service: XmaintDashboardLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XmaintDashboardLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
