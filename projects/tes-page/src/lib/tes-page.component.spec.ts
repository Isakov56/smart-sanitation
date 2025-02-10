import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesPageComponent } from './tes-page.component';

describe('TesPageComponent', () => {
  let component: TesPageComponent;
  let fixture: ComponentFixture<TesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
