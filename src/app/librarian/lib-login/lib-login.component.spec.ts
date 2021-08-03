import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibLoginComponent } from './lib-login.component';

describe('LibrarianLoginComponent', () => {
  let component: LibLoginComponent;
  let fixture: ComponentFixture<LibLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
