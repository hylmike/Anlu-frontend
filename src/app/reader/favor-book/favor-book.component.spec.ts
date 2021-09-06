import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavorBookComponent } from './favor-book.component';

describe('FavorBookComponent', () => {
  let component: FavorBookComponent;
  let fixture: ComponentFixture<FavorBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavorBookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavorBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
