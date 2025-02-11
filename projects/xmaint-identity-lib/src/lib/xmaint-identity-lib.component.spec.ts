import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XmaintIdentityLibComponent } from './xmaint-identity-lib.component';

describe('XmaintIdentityLibComponent', () => {
  let component: XmaintIdentityLibComponent;
  let fixture: ComponentFixture<XmaintIdentityLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XmaintIdentityLibComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XmaintIdentityLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
