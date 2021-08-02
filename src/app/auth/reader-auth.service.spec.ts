import { TestBed } from '@angular/core/testing';

import { ReaderAuthService } from './reader-auth.service';

describe('AuthService', () => {
  let service: ReaderAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReaderAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
