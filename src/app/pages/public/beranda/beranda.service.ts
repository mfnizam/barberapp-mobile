import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Barber, User } from '@core/interfaces/user.interface';
import { UserService } from '@core/services/user.service';
import { environment } from '@environment/environment';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Order } from '../pesanan/pesanan.interface';
import { GetBarbersParameter, GetBarbersResponse, GetOrdersParameter, GetOrdersResponse } from './beranda.interface';

@Injectable({
  providedIn: 'root'
})
export class BerandaService {
  private _barbers: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([] as User[]);
  get barbers$(): Observable<User[]> { return this._barbers.asObservable() }
  set barbers(value: User[]) { this._barbers.next(value); }
  get barbers(): (User[]) { return this._barbers.getValue() }

  private _orders: BehaviorSubject<Order[]> = new BehaviorSubject<Order[]>([] as Order[]);
  get orders$(): Observable<Order[]> { return this._orders.asObservable() }

  constructor(
    private http: HttpClient,
    private user: UserService
  ) { }

  getBarbers({ name, sortBy = 'name', limit = 10, page = 1 }: GetBarbersParameter): Observable<GetBarbersResponse> {
    return this.http.get<GetBarbersResponse>(environment.serverUrl + '/barbers', {
      params: {
        ...name ? { name: JSON.stringify({ $regex: name, $options: 'i' }) } : {},
        sortBy,
        limit,
        page,
      }
    })
      .pipe(tap(response => {
        this._barbers.next(response.results)
      }))
  }

  getOrders({ status = 0, sortBy = '-orderAt', limit = 10, page = 1 }: GetOrdersParameter): Observable<GetOrdersResponse> {
    return this.http.get<GetOrdersResponse>(environment.serverUrl + '/orders', {
      params: {
        status,
        sortBy,
        limit,
        page,
      }
    })
      .pipe(tap(response => {
        this._orders.next(response.results)
      }))
  }

  rejectOrder(orderId: string): Observable<Order>{
    return this.http.patch<Order>(environment.serverUrl + '/orders/' + orderId, { status: 3 })
  }

  acceptOrder(orderId: string): Observable<Order>{
    return this.http.patch<Order>(environment.serverUrl + '/orders/' + orderId, { status: 1 })
  }

  updateBarberAddress(userId: any, address: string){
    return this.http.patch<User>(environment.serverUrl + '/users/' + userId, { address })
    .pipe(
      switchMap(response => {
        this.user.setUser(response);
        return of(response)
      }));
  }

  updateBarberPrice(userId: any, price: number){
    return this.http.patch<User>(environment.serverUrl + '/barbers/' + userId, { price })
    .pipe(
      switchMap(response => {
        this.user.setUser(response);
        return of(response)
      }));
  }
}
