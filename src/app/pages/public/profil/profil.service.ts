import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@core/interfaces/user.interface';
import { UserService } from '@core/services/user.service';
import { environment } from '@environment/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  constructor(
    private http: HttpClient,
    private user: UserService
  ) { }

  uploadFoto(userId: string, photo: Blob): Observable<User> {
    let formData: FormData = new FormData();
    formData.append('file', photo, 'verifikasi');

    return this.http.patch<User>(environment.serverUrl + '/users/' + userId, formData)
    .pipe(
      tap(response => {
        this.user.user = response;
      }));

    // return this.http.patch<User>(environment.serverUrl + '/users/' + userId, user)
    // .pipe(
    //   switchMap(response => {
    //     this.user.setUser(response);
    //     return of(response)
    //   }));
  }
}
