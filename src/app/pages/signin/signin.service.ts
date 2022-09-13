import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '@core/interfaces/auth.interface';
import { AuthService } from '@core/services/auth.service';
import { UserService } from '@core/services/user.service';
import { environment } from '@environment/environment';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private user: UserService
  ) { }

  login(email: string, password: string){
    return this.http.post<LoginResponse>(environment.serverUrl + '/auth/login', { email, password }).pipe(
      switchMap(response => {
        this.auth.setAccessToken(response.tokens.access.token)
        this.auth.setRefreshToken(response.tokens.refresh.token)
        this.user.setUser(response.user);
        return of(response)
      }));
  }
}
