import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibProfileComponent } from './lib-profile.component';

describe('LibProfileComponent', () => {
  let component: LibProfileComponent;
  let fixture: ComponentFixture<LibProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
