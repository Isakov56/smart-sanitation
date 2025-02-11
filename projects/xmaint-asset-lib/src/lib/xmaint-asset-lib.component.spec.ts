import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XmaintAssetLibComponent } from './xmaint-asset-lib.component';

describe('XmaintAssetLibComponent', () => {
  let component: XmaintAssetLibComponent;
  let fixture: ComponentFixture<XmaintAssetLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XmaintAssetLibComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XmaintAssetLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
