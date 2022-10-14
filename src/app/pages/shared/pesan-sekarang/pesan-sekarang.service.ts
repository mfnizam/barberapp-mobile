import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pemesanan, PemesananParameter } from '@core/interfaces/pemesanan.interface';
import { User } from '@core/interfaces/user.interface';
import { environment } from '@environment/environment';
import { Observable } from 'rxjs';

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

  pesan(pemesanan: PemesananParameter): Observable<Pemesanan>{
    return this.http.post<Pemesanan>(environment.serverUrl + '/orders', pemesanan);
  }
}
