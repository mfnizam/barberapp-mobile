import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Barber, User } from '@core/interfaces/user.interface';
import { UserService } from '@core/services/user.service';
import { environment } from '@environment/environment';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UbahBarberService {
  
  constructor(
    private http: HttpClient,
    private user: UserService
  ) { }

  update(userId: any, barber: Barber){
    return this.http.patch<User>(environment.serverUrl + '/barbers/' + userId, barber)
    .pipe(
      switchMap(response => {
        this.user.setUser(response);
        return of(response)
      }));
  }
}
