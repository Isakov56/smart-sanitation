import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XmaintIdentityComponent } from './xmaint-identity.component';

describe('XmaintIdentityComponent', () => {
  let component: XmaintIdentityComponent;
  let fixture: ComponentFixture<XmaintIdentityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XmaintIdentityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XmaintIdentityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
