import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookPortalComponent } from './book-portal.component';

describe('BookPortalComponent', () => {
  let component: BookPortalComponent;
  let fixture: ComponentFixture<BookPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookPortalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
