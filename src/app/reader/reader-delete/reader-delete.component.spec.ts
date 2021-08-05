import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReaderDeleteComponent } from './reader-delete.component';

describe('ReaderDeleteComponent', () => {
  let component: ReaderDeleteComponent;
  let fixture: ComponentFixture<ReaderDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReaderDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReaderDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
