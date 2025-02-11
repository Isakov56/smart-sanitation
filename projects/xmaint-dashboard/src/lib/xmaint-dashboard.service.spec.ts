import { TestBed } from '@angular/core/testing';

import { XmaintDashboardService } from './xmaint-dashboard.service';

describe('XmaintDashboardService', () => {
  let service: XmaintDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XmaintDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
