import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@core/interfaces/user.interface';
import { environment } from '@environment/environment';
import { Observable } from 'rxjs';
import { CreateOrderParameter, Order } from '../../public/pesanan/pesanan.interface';

@Injectable({
  providedIn: 'root'
})
export class PesanSekarangService {
  
  constructor(
    private http: HttpClient
  ) { }

  getBarber(id: string): Observable<User> {
    return this.http.get<User>(environment.serverUrl + '/barbers/' + id);
  }

  pesan(pemesanan: CreateOrderParameter): Observable<Order>{
    return this.http.post<Order>(environment.serverUrl + '/orders', pemesanan);
  }
}
