import { TestBed } from '@angular/core/testing';

import { TemplateSmartSanitationService } from './template-smart-sanitation.service';

describe('TemplateSmartSanitationService', () => {
  let service: TemplateSmartSanitationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemplateSmartSanitationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
