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
  private barbers: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([] as User[]);

  constructor(
    private http: HttpClient
  ) { }

  get barbers$(): Observable<User[]> {
    return this.barbers.asObservable()
  }

  getBarbers({ name, sortBy = 'name', limit = 10, page = 1 }: GetBarbersParameter): Observable<GetBarbersResponse> {
    return this.http.get<GetBarbersResponse>(environment.serverUrl + '/barbers', { params: {
      ...name? { name: JSON.stringify({ $regex: name, $options: 'i' })} : {},
      sortBy, 
      limit, 
      page,
    }})
    .pipe(tap(response => {
      this.barbers.next(response.results)
    }))
  }
}
