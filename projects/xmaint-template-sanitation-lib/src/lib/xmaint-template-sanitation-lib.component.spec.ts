import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XmaintTemplateSanitationLibComponent } from './xmaint-template-sanitation-lib.component';

describe('XmaintTemplateSanitationLibComponent', () => {
  let component: XmaintTemplateSanitationLibComponent;
  let fixture: ComponentFixture<XmaintTemplateSanitationLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XmaintTemplateSanitationLibComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XmaintTemplateSanitationLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
