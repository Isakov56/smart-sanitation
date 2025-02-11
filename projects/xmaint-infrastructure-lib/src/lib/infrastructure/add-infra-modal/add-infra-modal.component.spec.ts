import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInfraModalComponent } from './add-infra-modal.component';

describe('AddInfraModalComponent', () => {
  let component: AddInfraModalComponent;
  let fixture: ComponentFixture<AddInfraModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddInfraModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddInfraModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
