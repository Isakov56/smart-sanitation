import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateSmartSanitationComponent } from './template-smart-sanitation.component';

describe('TemplateSmartSanitationComponent', () => {
  let component: TemplateSmartSanitationComponent;
  let fixture: ComponentFixture<TemplateSmartSanitationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplateSmartSanitationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplateSmartSanitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
