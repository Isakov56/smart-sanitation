import { TestBed } from '@angular/core/testing';

import { XmaintIotLibService } from './xmaint-iot-lib.service';

describe('XmaintIotLibService', () => {
  let service: XmaintIotLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XmaintIotLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
