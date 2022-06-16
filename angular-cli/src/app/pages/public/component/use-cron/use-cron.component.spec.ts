import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseCronComponent } from './use-cron.component';

describe('UseCronComponent', () => {
  let component: UseCronComponent;
  let fixture: ComponentFixture<UseCronComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UseCronComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UseCronComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
