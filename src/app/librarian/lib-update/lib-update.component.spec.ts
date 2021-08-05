import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibUpdateComponent } from './lib-update.component';

describe('LibUpdateComponent', () => {
  let component: LibUpdateComponent;
  let fixture: ComponentFixture<LibUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
