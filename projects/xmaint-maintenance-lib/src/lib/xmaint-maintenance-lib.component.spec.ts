import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XmaintMaintenanceLibComponent } from './xmaint-maintenance-lib.component';

describe('XmaintMaintenanceLibComponent', () => {
  let component: XmaintMaintenanceLibComponent;
  let fixture: ComponentFixture<XmaintMaintenanceLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XmaintMaintenanceLibComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XmaintMaintenanceLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
