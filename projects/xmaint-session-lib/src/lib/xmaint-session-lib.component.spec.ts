import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XmaintSessionLibComponent } from './xmaint-session-lib.component';

describe('XmaintSessionLibComponent', () => {
  let component: XmaintSessionLibComponent;
  let fixture: ComponentFixture<XmaintSessionLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XmaintSessionLibComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XmaintSessionLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
