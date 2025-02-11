import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XmaintMonitoringLibComponent } from './xmaint-monitoring-lib.component';

describe('XmaintMonitoringLibComponent', () => {
  let component: XmaintMonitoringLibComponent;
  let fixture: ComponentFixture<XmaintMonitoringLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XmaintMonitoringLibComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XmaintMonitoringLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
