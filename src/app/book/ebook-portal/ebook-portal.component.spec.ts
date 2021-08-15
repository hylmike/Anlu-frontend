import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EbookPortalComponent } from './ebook-portal.component';

describe('EbookPortalComponent', () => {
  let component: EbookPortalComponent;
  let fixture: ComponentFixture<EbookPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EbookPortalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EbookPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
