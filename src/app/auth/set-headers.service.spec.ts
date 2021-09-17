import { TestBed } from '@angular/core/testing';

import { SetHeadersService } from './set-headers.service';

describe('SetHeadersService', () => {
  let service: SetHeadersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetHeadersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
