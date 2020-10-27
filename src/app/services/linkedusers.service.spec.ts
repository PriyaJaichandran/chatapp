import { TestBed } from '@angular/core/testing';

import { LinkedusersService } from './linkedusers.service';

describe('LinkedusersService', () => {
  let service: LinkedusersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LinkedusersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
