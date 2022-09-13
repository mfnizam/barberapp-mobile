import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '@core/interfaces/user.interface';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _user: BehaviorSubject<User> = new BehaviorSubject<User>({} as User);

  get user$(): Observable<User>{ return this._user.asObservable(); }

  set user(value: User) { this._user.next(value); }
  get user(): (User) { return this._user.getValue() }

  setUser(user: User): Promise<any> { return this.storage.set('user', user) }
  getUser(): Promise<any> { return this.storage.get('user') }

  constructor(
    private storage: StorageService
  ) {}

  async initUser() {
    this.user = await this.getUser();
  }
}
