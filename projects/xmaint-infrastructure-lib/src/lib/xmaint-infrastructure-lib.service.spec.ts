import { TestBed } from '@angular/core/testing';

import { XmaintInfrastructureLibService } from './xmaint-infrastructure-lib.service';

describe('XmaintInfrastructureLibService', () => {
  let service: XmaintInfrastructureLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XmaintInfrastructureLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
