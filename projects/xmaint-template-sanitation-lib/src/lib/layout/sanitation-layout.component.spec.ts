import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SanitationLayoutComponent } from './sanitation-layout.component';

describe('SanitationLayoutComponent', () => {
  let component: SanitationLayoutComponent;
  let fixture: ComponentFixture<SanitationLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SanitationLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SanitationLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
