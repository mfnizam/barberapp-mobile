import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GetHistoriesParameter, GetHistoriesResponse, History } from './riwayat.interface';

@Injectable({
  providedIn: 'root'
})
export class RiwayatService {
  private histories: BehaviorSubject<History[]> = new BehaviorSubject<History[]>([] as History[]);

  constructor(
    private http: HttpClient
  ) { }

  get histories$(): Observable<History[]> {
    return this.histories.asObservable()
  }

  getBarbers({ name, sortBy = 'name', limit = 10, page = 1 }: GetHistoriesParameter): Observable<GetHistoriesResponse> {
    return this.http.get<any>(environment.serverUrl + '/histories', {
      params: {
        name: name ? JSON.stringify({ $regex: name, $options: 'i' }) : '',
        sortBy,
        limit,
        page,
      }
    }).pipe(tap(response => {
      this.histories.next(response.results)
    }))
  }
}
