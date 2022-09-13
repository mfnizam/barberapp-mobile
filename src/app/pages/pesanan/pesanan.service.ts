import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GetOrdersParameter, GetOrdersResponse, Order } from './pesanan.interface';

@Injectable({
  providedIn: 'root'
})
export class PesananService {
  private orders: BehaviorSubject<Order[]> = new BehaviorSubject<Order[]>([] as Order[]);

  constructor(
    private http: HttpClient
  ) { }

  get orders$(): Observable<Order[]> {
    return this.orders.asObservable()
  }

  getBarbers({ name, sortBy = 'name', limit = 10, page = 1 }: GetOrdersParameter): Observable<GetOrdersResponse> {
    return this.http.get<GetOrdersResponse>(environment.serverUrl + '/barbers', {
      params: {
        name: name ? JSON.stringify({ $regex: name, $options: 'i' }) : '',
        sortBy,
        limit,
        page,
      }
    }).pipe(tap(response => {
      this.orders.next(response.results)
    }))
  }
}
