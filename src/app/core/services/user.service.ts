import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of, from } from 'rxjs';
import { User } from '@core/interfaces/user.interface';
import { StorageService } from './storage.service';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _user: BehaviorSubject<User> = new BehaviorSubject<User>({} as User);

  get user$(): Observable<User>{ return this._user.asObservable(); }

  set user(value: User) { 
    this.storage.set('user', value);
    this._user.next(value); 
  }
  get user(): (User) { return this._user.getValue() }

  setUser(user: User): Promise<any> { 
    this.user = user;
    return this.storage.set('user', user) 
  }
  getUser(): Promise<any> { 
    return this.storage.get('user') 
  }

  constructor(
    private storage: StorageService
  ) {}

  async initUser() {
    this.user = await this.getUser();
    return this.user;
  }

  roleCheck(): Observable<string> {
    return from(this.initUser())
    .pipe(switchMap(user => {
      return of(user.role)
    }))
  }
}
