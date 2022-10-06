import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@core/interfaces/user.interface';
import { environment } from '@environment/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GetBarbersParameter, GetBarbersResponse } from './beranda.interface';

@Injectable({
  providedIn: 'root'
})
export class BerandaService {
  private _barbers: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([] as User[]);

  get barbers$(): Observable<User[]> { return this._barbers.asObservable() }

  set barbers(value: User[]) { this._barbers.next(value); }
  get barbers(): (User[]) { return this._barbers.getValue() }

  constructor(
    private http: HttpClient
  ) { }

  getBarbers({ name, sortBy = 'name', limit = 10, page = 1 }: GetBarbersParameter): Observable<GetBarbersResponse> {
    return this.http.get<GetBarbersResponse>(environment.serverUrl + '/barbers', { params: {
      ...name? { name: JSON.stringify({ $regex: name, $options: 'i' })} : {},
      sortBy, 
      limit, 
      page,
    }})
    .pipe(tap(response => {
      this._barbers.next(response.results)
    }))
  }
}
