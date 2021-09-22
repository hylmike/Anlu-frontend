import { TestBed } from '@angular/core/testing';

import { CommonService } from './common.service';

describe('CommonService', () => {
  let service: CommonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call usernameUpdate to send username value', ()=>{
    service.setSubject('testName');
    service.usernameUpdate.subscribe((username)=>{
      expect(username).toEqual('testName');
    });
  })
});
