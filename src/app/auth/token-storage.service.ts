import { Injectable } from '@angular/core';
import * as moment from 'moment';

import { AccessToken } from '../common/reader.dto';

const TOKEN_KEY = 'user_access_token';
const EXPIRE_AT = 'user_expire_at';
const USER_KEY = 'userName';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  public clearToken(): void {
    window.sessionStorage.clear()
  }

  public saveToken(accessToken: AccessToken, userName: string): void {
    const expire_at = moment().add(parseInt(accessToken.expireIn), 's');
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.removeItem(EXPIRE_AT);
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, accessToken.token_info);
    window.sessionStorage.setItem(EXPIRE_AT, JSON.stringify(expire_at.valueOf()));
    window.sessionStorage.setItem(USER_KEY, userName);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public getUsername(): string | null {
    return window.sessionStorage.getItem(USER_KEY);
  }

  public getExpiration() {
    const expiration = window.sessionStorage.getItem(EXPIRE_AT);
    if (expiration) {
      return moment(JSON.parse(expiration))
    };
    return moment().calendar();
  }

  public isExpired() {
    return !moment().isBefore(this.getExpiration());
  }
}
