import { Component } from '@angular/core';
import { ErrorResponse } from '@core/interfaces/error.interface';
import { ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Order } from '../pesanan/pesanan.interface';
import { RiwayatService } from './riwayat.service';

@Component({
  selector: 'app-riwayat',
  templateUrl: 'riwayat.page.html'
})
export class RiwayatPage {
   // TODO: buat search dengan form builder
   searchForm = '';
   orders$: Observable<Order[]> = new BehaviorSubject<Order[]>([] as Order[]);
 
   constructor(
     private riwayat: RiwayatService,
     private toast: ToastController
   ) {
     this.orders$ = this.riwayat.orders$;
 
     this.riwayat.getOrders({ })
     .subscribe(res => {
       console.log(res)
     }, (err: ErrorResponse) => {
       console.log(err)
       // this.showToast(err.error.message)
     })
   }
 
   async showToast(message = 'Terjadi Kesalahan', color = 'danger'){
     let toast = await this.toast.create({
       message,
       duration: 3000,
       mode: 'ios',
       buttons: [{ icon: 'close'}],
       color
     })
 
     toast.present();
   }
 
   trackByFn(index: number, item: any): any {
     return item.id || index;
   }
}
