import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibRegisterComponent } from './lib-register.component';

describe('LibRegisterComponent', () => {
  let component: LibRegisterComponent;
  let fixture: ComponentFixture<LibRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
