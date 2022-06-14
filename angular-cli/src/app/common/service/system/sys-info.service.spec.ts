import { TestBed } from '@angular/core/testing';

import { SysInfoService } from './sys-info.service';

describe('SysInfoService', () => {
  let service: SysInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SysInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
