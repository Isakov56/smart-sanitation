import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavRightComponent } from './side-nav-right.component';

describe('SideNavRightComponent', () => {
  let component: SideNavRightComponent;
  let fixture: ComponentFixture<SideNavRightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideNavRightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideNavRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
