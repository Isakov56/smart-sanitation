import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XmaintSharedLibComponent } from './xmaint-shared-lib.component';

describe('XmaintSharedLibComponent', () => {
  let component: XmaintSharedLibComponent;
  let fixture: ComponentFixture<XmaintSharedLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XmaintSharedLibComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XmaintSharedLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
