import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CreateReviewParameter, GetOrdersParameter, GetOrdersResponse, Order, Review } from '../pesanan/pesanan.interface';

@Injectable({
  providedIn: 'root'
})
export class RiwayatService {
  private orders: BehaviorSubject<Order[]> = new BehaviorSubject<Order[]>([] as Order[]);

  constructor(
    private http: HttpClient
  ) { }

  get orders$(): Observable<Order[]> {
    return this.orders.asObservable()
  }

  getOrders({ sortBy = 'createAt', limit = 10, page = 1 }: GetOrdersParameter): Observable<GetOrdersResponse> {
    return this.http.get<GetOrdersResponse>(environment.serverUrl + '/orders', {
      params: {
        status: JSON.stringify({ $gt: 1 }),
        sortBy,
        limit,
        page,
      }
    }).pipe(tap(response => {
      this.orders.next(response.results)
    }))
  }

  createReview(review: CreateReviewParameter): Observable<Review> {
    return this.http.post<Review>(environment.serverUrl + '/reviews', review)
  }
}
