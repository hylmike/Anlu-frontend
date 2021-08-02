import { TestBed } from '@angular/core/testing';

import { LibrarianAuthGuard } from './librarian-auth.guard';

describe('LibrarianAuthGuard', () => {
  let guard: LibrarianAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LibrarianAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
