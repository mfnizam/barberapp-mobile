import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@core/interfaces/user.interface';
import { environment } from '@environment/environment';
import { Observable } from 'rxjs';
import { GetReviewsResponse } from '../../public/pesanan/pesanan.interface';

@Injectable({
  providedIn: 'root'
})
export class DetailBarberService {
  
  constructor(
    private http: HttpClient
  ) { }

  getBarber(id: string): Observable<User> {
    return this.http.get<User>(environment.serverUrl + '/barbers/' + id);
  }

  getReview(idBarber: string): Observable<GetReviewsResponse>{
    return this.http.get<GetReviewsResponse>(environment.serverUrl + '/reviews', {
      params: {
        barber: idBarber
      }
    });
  }
}
