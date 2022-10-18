import { Component } from '@angular/core';
import { ErrorResponse } from '@core/interfaces/error.interface';
import { User } from '@core/interfaces/user.interface';
import { UserService } from '@core/services/user.service';
import { ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Order } from './pesanan.interface';
import { PesananService } from './pesanan.service';

@Component({
  selector: 'app-pesanan',
  templateUrl: 'pesanan.page.html'
})
export class PesananPage {
  // TODO: buat search dengan form builder
  userData: User = this.user.user;
  searchForm = '';
  orders$: Observable<Order[]> = new BehaviorSubject<Order[]>([] as Order[]);

  constructor(
    private pesanan: PesananService,
    private toast: ToastController,
    private user: UserService
  ) {
    this.orders$ = this.pesanan.orders$;
  }

  ionViewDidEnter() {
    this.userData = this.user.user;
    this.pesanan.getOrders({})
      .subscribe(res => {
        console.log(res)
      }, (err: ErrorResponse) => {
        console.log(err)
        this.showToast(err.error.message)
      })
  }

  orderDone(orderId: string) {
    this.pesanan.orderDone(orderId)
      .subscribe(res => {
        console.log(res);
        this.showToast('Berhasil menyelesaikan pemesanan', 'medium')
      }, err => {
        console.log(err)
        this.showToast(err.error.message)
      })
  }

  async showToast(message = 'Terjadi Kesalahan', color = 'danger') {
    let toast = await this.toast.create({
      message,
      duration: 3000,
      mode: 'ios',
      buttons: [{ icon: 'close' }],
      color
    })

    toast.present();
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }
}
