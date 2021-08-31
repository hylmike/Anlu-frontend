import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopManageComponent } from './workshop-manage.component';

describe('WorkshopManageComponent', () => {
  let component: WorkshopManageComponent;
  let fixture: ComponentFixture<WorkshopManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkshopManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
