import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrarianUpdateComponent } from './librarian-update.component';

describe('LibrarianUpdateComponent', () => {
  let component: LibrarianUpdateComponent;
  let fixture: ComponentFixture<LibrarianUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibrarianUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibrarianUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
