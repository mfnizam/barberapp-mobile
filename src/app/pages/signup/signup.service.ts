import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { switchMap } from 'rxjs/operators';
import { RegisterResponse } from '@core/interfaces/auth.interface';
import { AuthService } from '@core/services/auth.service';
import { UserService } from '@core/services/user.service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private user: UserService
  ) { }

  register(name: string, address: string, email: string, password: string, isBarber: boolean = false){
    return this.http.post<RegisterResponse>(environment.serverUrl + '/auth/register', { 
      name, 
      address, 
      email, 
      password,
      role: isBarber? 'barber' : 'user',
    }).pipe(
      switchMap(response => {
        this.auth.setAccessToken(response.tokens.access.token)
        this.auth.setRefreshToken(response.tokens.refresh.token)
        this.user.setUser(response.user);
        return of(response)
      }));
  }
}
