import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XmaintReportsLibComponent } from './xmaint-reports-lib.component';

describe('XmaintReportsLibComponent', () => {
  let component: XmaintReportsLibComponent;
  let fixture: ComponentFixture<XmaintReportsLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XmaintReportsLibComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XmaintReportsLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
