import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsmDataTableComponent } from './psm-data-table.component';

describe('PsmDataTableComponent', () => {
  let component: PsmDataTableComponent;
  let fixture: ComponentFixture<PsmDataTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PsmDataTableComponent]
    });
    fixture = TestBed.createComponent(PsmDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
