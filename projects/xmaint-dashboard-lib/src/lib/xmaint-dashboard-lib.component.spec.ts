import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XmaintDashboardLibComponent } from './xmaint-dashboard-lib.component';

describe('XmaintDashboardLibComponent', () => {
  let component: XmaintDashboardLibComponent;
  let fixture: ComponentFixture<XmaintDashboardLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XmaintDashboardLibComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XmaintDashboardLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
