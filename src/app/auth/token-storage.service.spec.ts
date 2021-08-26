import { TestBed } from '@angular/core/testing';
import * as moment from 'moment';
import { accessTokenStub, readerStub } from 'src/test/reader.stub';

import { TokenStorageService } from './token-storage.service';

describe('TokenStorageService', () => {
  let tokenService: TokenStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    tokenService = TestBed.inject(TokenStorageService);
  });

  it('should be created', () => {
    expect(tokenService).toBeTruthy();
  });

  describe('clearToken', () => {
    it('should clear token info', () => {
      tokenService.clearToken();
      expect(tokenService.getToken()).toEqual(null);
    });
  });

  describe('saveToken', () => {
    it('should save access token and username into local storage', () => {
      tokenService.saveToken(accessTokenStub(), readerStub().username);
      expect(tokenService.getToken()).toEqual(accessTokenStub().token_info);
      const expire_at = moment().add(parseInt(accessTokenStub().expireIn), 's');
      expect(tokenService.getExpiration().toString()).toEqual(expire_at.toString());
      expect(tokenService.getUsername()).toEqual(readerStub().username);
    });
  });

  describe('getToken', () => {
    it('should get access token from local storage', () => {
      tokenService.saveToken(accessTokenStub(), readerStub().username);
      expect(tokenService.getToken()).toEqual(accessTokenStub().token_info);
    });
  });

  describe('getUsername', () => {
    it('should get username from local storage', () => {
      tokenService.saveToken(accessTokenStub(), readerStub().username);
      expect(tokenService.getUsername()).toEqual(readerStub().username);
    });
  });

  describe('getExpiration', () => {
    it('should get access expiration info from local storage', () => {
      tokenService.saveToken(accessTokenStub(), readerStub().username);
      const expire_at = moment().add(parseInt(accessTokenStub().expireIn), 's');
      expect(tokenService.getExpiration().toString()).toEqual(expire_at.toString());
    });
  });

  describe('isExpired', () => {
    it('should return boolean', () => {
      tokenService.saveToken(accessTokenStub(), readerStub().username);
      expect(tokenService.isExpired()).toEqual(false);
    });
  });
});
