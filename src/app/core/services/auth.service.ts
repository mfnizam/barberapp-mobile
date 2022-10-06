import { Injectable } from '@angular/core';

import { from, Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import { AuthUtils } from '@core/utils/auth.utils';
import { UserService } from '@core/services/user.service';
import { StorageService } from '@core/services/storage.service';
import { environment } from '@environment/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '@core/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authenticated: boolean = false;
  
  constructor(
    private http: HttpClient,
    private user: UserService,
    private storage: StorageService
  ) { }

  setAccessToken(token: string): Promise<any> { return this.storage.set('accessToken', token) }
  getAccessToken(): Promise<any> { return this.storage.get('accessToken') }
  
  // TODO: this is not use because not implementing refresh token
  setRefreshToken(token: string): Promise<any> { return this.storage.set('refreshToken', token) }
  getRefreshToken(): Promise<any> { return this.storage.get('refreshToken') }
    
  async signOut() {
    await this.storage.remove('accessToken');
    await this.storage.remove('refreshToken');
    await this.storage.remove('user');
    // TODO: add remove barber from berandaService

    this.authenticated = false;
    this.user.user = {} as User;
  }
  
  authCheck(): Observable<boolean> {
    return from(this.getAccessToken())
    .pipe(switchMap(accessToken => {
      if(accessToken && !AuthUtils.isTokenExpired(accessToken)) {
        this.authenticated = true;
        this.user.initUser();
        return of(true);
      }
      return of(false)
      // return this.signInUsingToken();
    }))
  }

  // signInUsingToken(): Observable<any> {
  //   return this.http.post(environment.serverUrl + 'api/auth/refresh-access-token', { refreshToken: })
  //   .pipe(
  //     catchError(() => of(false)),
  //     switchMap((response: any) => {
  //       if(response.success && response.accessToken){
  //         this.setAccessToken(response.accessToken)
  //         this.authenticated = true;
  //         this.user.user = AuthUtils._decodeToken(response.accessToken);
  //         return of(true);
  //       }
  //       return of(false)
  //     }));
  // }

  
}
