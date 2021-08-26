import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NGXLogger } from 'ngx-logger';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let loggerSpy: jasmine.SpyObj<NGXLogger>;

  beforeEach(async () => {
    //mock the NGXLogger service
    const spy = jasmine.createSpyObj('NGXLogger', ['info', 'warn', 'error']);
    //initiate the test module
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: NGXLogger,
          useValue: spy,
        }
      ],
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
    //Inject the NGXLogger service
    loggerSpy = TestBed.inject(NGXLogger) as jasmine.SpyObj<NGXLogger>;
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'frontend'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('frontend');
  });

  it('should call the logger.info service', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(loggerSpy.info).toHaveBeenCalled();
  })
});
