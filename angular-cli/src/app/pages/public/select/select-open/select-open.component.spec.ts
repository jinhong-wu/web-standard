import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectOpenComponent } from './select-open.component';

describe('SelectOpenComponent', () => {
  let component: SelectOpenComponent;
  let fixture: ComponentFixture<SelectOpenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectOpenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectOpenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
