import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrarianRegisterComponent } from './librarian-register.component';

describe('LibrarianRegisterComponent', () => {
  let component: LibrarianRegisterComponent;
  let fixture: ComponentFixture<LibrarianRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibrarianRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibrarianRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
