import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@core/interfaces/user.interface';
import { UserService } from '@core/services/user.service';
import { environment } from '@environment/environment';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UbahProfilService {
  
  constructor(
    private http: HttpClient,
    private user: UserService
  ) { }

  update(userId: any, user: User){
    return this.http.patch<User>(environment.serverUrl + '/users/' + userId, user)
    .pipe(
      switchMap(response => {
        this.user.setUser(response);
        return of(response)
      }));
  }
}
