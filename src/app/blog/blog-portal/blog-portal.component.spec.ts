import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogPortalComponent } from './blog-portal.component';

describe('BlogPortalComponent', () => {
  let component: BlogPortalComponent;
  let fixture: ComponentFixture<BlogPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogPortalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
