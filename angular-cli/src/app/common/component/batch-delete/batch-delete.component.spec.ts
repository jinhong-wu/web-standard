import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchDeleteComponent } from './batch-delete.component';

describe('BatchDeleteComponent', () => {
  let component: BatchDeleteComponent;
  let fixture: ComponentFixture<BatchDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
