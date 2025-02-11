import { TestBed } from '@angular/core/testing';

import { XmaintTemplateSanitationLibService } from './xmaint-template-sanitation-lib.service';

describe('XmaintTemplateSanitationLibService', () => {
  let service: XmaintTemplateSanitationLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XmaintTemplateSanitationLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
