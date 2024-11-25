import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsLibComponent } from './charts-lib.component';

describe('ChartsLibComponent', () => {
  let component: ChartsLibComponent;
  let fixture: ComponentFixture<ChartsLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartsLibComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartsLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
