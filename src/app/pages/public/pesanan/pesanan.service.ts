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

  getOrders({ sortBy = 'createdAt', limit = 10, page = 1 }: GetOrdersParameter): Observable<GetOrdersResponse> {
    return this.http.get<GetOrdersResponse>(environment.serverUrl + '/orders', {
      params: {
        status: JSON.stringify({ $lt: 2 }),
        sortBy,
        limit,
        page,
      }
    }).pipe(tap(response => {
      this.orders.next(response.results)
    }))
  }
}
