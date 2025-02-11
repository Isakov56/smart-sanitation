import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XmaintIotLibComponent } from './xmaint-iot-lib.component';

describe('XmaintIotLibComponent', () => {
  let component: XmaintIotLibComponent;
  let fixture: ComponentFixture<XmaintIotLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XmaintIotLibComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XmaintIotLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
