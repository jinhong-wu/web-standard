import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormControlInfoComponent } from './form-control-info.component';

describe('FormControlInfoComponent', () => {
  let component: FormControlInfoComponent;
  let fixture: ComponentFixture<FormControlInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormControlInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormControlInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
