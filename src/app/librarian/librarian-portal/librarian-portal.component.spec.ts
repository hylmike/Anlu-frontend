import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrarianPortalComponent } from './librarian-portal.component';

describe('LibrarianPortalComponent', () => {
  let component: LibrarianPortalComponent;
  let fixture: ComponentFixture<LibrarianPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibrarianPortalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibrarianPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
