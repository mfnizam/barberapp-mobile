import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { Observable } from 'rxjs';
import { Order } from '../../public/pesanan/pesanan.interface';

@Injectable({
  providedIn: 'root'
})
export class DetailPemesananService {
  
  constructor(
    private http: HttpClient
  ) { }

  getOrder(orderId: string): Observable<Order> {
    return this.http.get<Order>(environment.serverUrl + '/orders/' + orderId);
  }
}
