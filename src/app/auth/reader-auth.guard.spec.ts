import { TestBed } from '@angular/core/testing';

import { ReaderAuthGuard } from './reader-auth.guard';

describe('UserAuthGuard', () => {
  let guard: ReaderAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ReaderAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
