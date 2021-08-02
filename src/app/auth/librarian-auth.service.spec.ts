import { TestBed } from '@angular/core/testing';

import { LibrarianAuthService } from './librarian-auth.service';

describe('LibrarianAuthService', () => {
  let service: LibrarianAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibrarianAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
