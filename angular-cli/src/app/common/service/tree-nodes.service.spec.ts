import { TestBed } from '@angular/core/testing';

import { TreeNodesService } from './tree-nodes.service';

describe('TreeNodesService', () => {
  let service: TreeNodesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TreeNodesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
