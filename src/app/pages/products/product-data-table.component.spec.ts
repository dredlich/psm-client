import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDataTableComponent } from './product-data-table.component';

describe('PsmDataTableComponent', () => {
  let component: ProductDataTableComponent;
  let fixture: ComponentFixture<ProductDataTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductDataTableComponent]
    });
    fixture = TestBed.createComponent(ProductDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
