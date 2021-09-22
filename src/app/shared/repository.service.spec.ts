import { TestBed } from '@angular/core/testing';

import { TaskRepositoryService } from './task-repository.service';

describe('RepositoryService', () => {
  let service: TaskRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
