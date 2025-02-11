import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XmaintNgrxStoreLibComponent } from './xmaint-ngrx-store-lib.component';

describe('XmaintNgrxStoreLibComponent', () => {
  let component: XmaintNgrxStoreLibComponent;
  let fixture: ComponentFixture<XmaintNgrxStoreLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XmaintNgrxStoreLibComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XmaintNgrxStoreLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
