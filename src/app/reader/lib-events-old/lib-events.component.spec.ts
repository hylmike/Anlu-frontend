import { DatePipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NGXLogger } from 'ngx-logger';
import { of } from 'rxjs';
import { BlogService } from 'src/app/blog/blog.service';
import { WorkshopService } from 'src/app/workshop/workshop.service';
import { blogStub } from 'src/test/blog.stub';
import { BlogServiceSpy, LoggerSpy, WorkshopServiceSpy } from 'src/test/mock.service';
import { workshopStub } from 'src/test/workshop.stub';

import { LibEventsComponent } from './lib-events.component';

describe('LibEventsComponent', () => {
  let component: LibEventsComponent;
  let fixture: ComponentFixture<LibEventsComponent>;
  let getWsListSpy: jasmine.Spy;
  let getLatestBlogSpy: jasmine.Spy;

  beforeEach(async () => {
    getWsListSpy = WorkshopServiceSpy.getWsList.and.returnValue(of([workshopStub()]));
    getLatestBlogSpy = BlogServiceSpy.getLatest.and.returnValue(of([blogStub()]));
    await TestBed.configureTestingModule({
      providers: [
        DatePipe,
        {
          provide: NGXLogger,
          useValue: LoggerSpy,
        },
        {
          provide: BlogService,
          useValue: BlogServiceSpy,
        },
        {
          provide: WorkshopService,
          useValue: WorkshopServiceSpy,
        },
      ],
      declarations: [ LibEventsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call BlogService to get latest blogs and render in page', ()=>{
    const blogList = document.getElementById('latest-blogs');
    expect(getLatestBlogSpy).toHaveBeenCalledWith(6);
    expect(blogList.childElementCount).toBeGreaterThanOrEqual(1);
  });

  it('should call WorkshopService to get latest Ws and render in page', ()=>{
    const indContainer = document.querySelector('div.carousel-indicators');
    const slideContainer = document.querySelector('div.carousel-inner');
    expect(getWsListSpy).toHaveBeenCalledWith(3);
    expect(indContainer.childElementCount).toBeGreaterThanOrEqual(1);
    expect(slideContainer.childElementCount).toBeGreaterThanOrEqual(1);
  });
});
