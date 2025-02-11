import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XmaintCoreLibComponent } from './xmaint-core-lib.component';

describe('XmaintCoreLibComponent', () => {
  let component: XmaintCoreLibComponent;
  let fixture: ComponentFixture<XmaintCoreLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XmaintCoreLibComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XmaintCoreLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
