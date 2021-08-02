import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  public usernameUpdate: BehaviorSubject<any> = new BehaviorSubject(null);

  setSubject(value: string) {
    if (value) {
      this.usernameUpdate.next(value);
    } else {
      this.usernameUpdate.next(null);
    }
  }
}
