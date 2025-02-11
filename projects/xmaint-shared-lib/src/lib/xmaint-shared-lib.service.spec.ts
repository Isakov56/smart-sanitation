import { TestBed } from '@angular/core/testing';

import { XmaintSharedLibService } from './xmaint-shared-lib.service';

describe('XmaintSharedLibService', () => {
  let service: XmaintSharedLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XmaintSharedLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
