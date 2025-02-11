import { TestBed } from '@angular/core/testing';

import { XmaintMaintenanceLibService } from './xmaint-maintenance-lib.service';

describe('XmaintMaintenanceLibService', () => {
  let service: XmaintMaintenanceLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XmaintMaintenanceLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
