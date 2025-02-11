import { TestBed } from '@angular/core/testing';

import { XmaintSessionLibService } from './xmaint-session-lib.service';

describe('XmaintSessionLibService', () => {
  let service: XmaintSessionLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XmaintSessionLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
