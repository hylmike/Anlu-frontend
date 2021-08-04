import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopPortalComponent } from './workshop-portal.component';

describe('WorkshopPortalComponent', () => {
  let component: WorkshopPortalComponent;
  let fixture: ComponentFixture<WorkshopPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkshopPortalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
