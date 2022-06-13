import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PwdVerifyComponent } from './pwd-verify.component';

describe('PwdVerifyComponent', () => {
  let component: PwdVerifyComponent;
  let fixture: ComponentFixture<PwdVerifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PwdVerifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PwdVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
