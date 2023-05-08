import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsesDataTableComponent } from './uses-data-table.component';

describe('UsesComponent', () => {
  let component: UsesDataTableComponent;
  let fixture: ComponentFixture<UsesDataTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsesDataTableComponent]
    });
    fixture = TestBed.createComponent(UsesDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
