import { TestBed } from '@angular/core/testing';

import { SysInitService } from './sys-init.service';

describe('SysInitService', () => {
  let service: SysInitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SysInitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
