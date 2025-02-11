import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XmaintInfrastructureLibComponent } from './xmaint-infrastructure-lib.component';

describe('XmaintInfrastructureLibComponent', () => {
  let component: XmaintInfrastructureLibComponent;
  let fixture: ComponentFixture<XmaintInfrastructureLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XmaintInfrastructureLibComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XmaintInfrastructureLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
