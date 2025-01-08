import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestStoreLibComponent } from './test-store-lib.component';

describe('TestStoreLibComponent', () => {
  let component: TestStoreLibComponent;
  let fixture: ComponentFixture<TestStoreLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestStoreLibComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestStoreLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
