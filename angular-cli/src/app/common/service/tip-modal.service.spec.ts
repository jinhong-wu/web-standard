import { TestBed } from '@angular/core/testing';

import { TipModalService } from './tip-modal.service';

describe('TipModalService', () => {
  let service: TipModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
