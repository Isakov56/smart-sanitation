import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSensorModalComponent } from './add-sensor-modal.component';

describe('AddSensorModalComponent', () => {
  let component: AddSensorModalComponent;
  let fixture: ComponentFixture<AddSensorModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSensorModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSensorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
