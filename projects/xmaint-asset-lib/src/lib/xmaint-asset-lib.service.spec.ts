import { TestBed } from '@angular/core/testing';

import { XmaintAssetLibService } from './xmaint-asset-lib.service';

describe('XmaintAssetLibService', () => {
  let service: XmaintAssetLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XmaintAssetLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
