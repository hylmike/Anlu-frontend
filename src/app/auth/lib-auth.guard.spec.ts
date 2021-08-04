import { TestBed } from '@angular/core/testing';

import { LibAuthGuard } from './lib-auth.guard';

describe('LibAuthGuard', () => {
  let guard: LibAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LibAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
