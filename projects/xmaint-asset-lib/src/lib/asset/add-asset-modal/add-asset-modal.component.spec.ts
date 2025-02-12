import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAssetModalComponent } from './add-asset-modal.component';

describe('AddAssetModalComponent', () => {
  let component: AddAssetModalComponent;
  let fixture: ComponentFixture<AddAssetModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAssetModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAssetModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
