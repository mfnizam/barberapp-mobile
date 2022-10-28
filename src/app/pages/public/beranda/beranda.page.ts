import { Component } from '@angular/core';
import { ErrorResponse } from '@core/interfaces/error.interface';
import { User } from '@core/interfaces/user.interface';
import { AuthService } from '@core/services/auth.service';
import { UserService } from '@core/services/user.service';
import { NavController, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Order } from '../pesanan/pesanan.interface';
import { BerandaService } from './beranda.service';

@Component({
  selector: 'app-beranda',
  templateUrl: 'beranda.page.html'
})
export class BerandaPage {
  today = new Date().getDay();
  hourNow = new Date(0).setHours(new Date().getHours(), new Date().getMinutes());
  userData: User = this.user.user;

  searchForm = "";
  barbers$: Observable<User[]> = new BehaviorSubject<User[]>([] as User[]);

  orders$: Observable<Order[]> = new BehaviorSubject<Order[]>([] as Order[]);

  constructor(
    private navCtrl: NavController,
    private beranda: BerandaService,
    private toast: ToastController,
    private user: UserService,
    private auth: AuthService,
  ) {
    console.log(this.userData)
  }

  ionViewDidEnter() {
    this.userData = this.user.user;

    if (this.userData.role === 'user') {
      this.barbers$ = this.beranda.barbers$;
      this.beranda.getBarbers({ name: this.searchForm })
        .subscribe(res => {
          console.log(res)
        }, (err: ErrorResponse) => {
          console.log(err)
          this.showToast(err.error.message)
        })
    } else if (this.userData.role === 'barber') {
      this.orders$ = this.beranda.orders$
      this.beranda.getOrders({})
        .subscribe(res => { console.log(res) }, (err: ErrorResponse) => {
          console.log(err)
          this.showToast(err.error.message)
        })
    }
  }

  activateDeactivate() {
    // if(!this.userData?.barber) return
    this.userData.barber = { ...this.userData.barber, active: !this.userData.barber?.active }
  }

  acceptOrder(orderId: string) {
    this.beranda.acceptOrder(orderId)
      .subscribe(res => {
        console.log(res);
        this.showToast('Berhasil menerima pemesanan', 'medium')
        this.navCtrl.navigateForward(['/pesanan'])
      }, err => {
        console.log(err)
        this.showToast(err.error.message)
      })
  }

  rejectOrder(orderId: string) {
    this.beranda.rejectOrder(orderId)
      .subscribe(res => {
        console.log(res);
        this.beranda.getOrders({})
        .subscribe(res => { console.log(res) }, (err: ErrorResponse) => {
          console.log(err)
          this.showToast(err.error.message)
        })
        this.showToast('Berhasil menolak pemesanan', 'medium');
      }, err => {
        console.log(err)
        this.showToast(err.error.message)
      })
  }

  updateAddress(modal: any, address: string) {
    if (!address) return;
    this.beranda.updateBarberAddress(this.userData.id, address)
      .subscribe(res => {
        this.userData = res
        console.log(res);
        modal.dismiss();
      }, err => {
        console.log(err)
      })
  }

  updatePrice(modal: any, price: any) {
    if (!price) return;
    this.beranda.updateBarberPrice(this.userData.id, price)
      .subscribe(res => {
        this.userData = res
        console.log(res);
        modal.dismiss();
      }, err => {
        console.log(err)
      })
  }


  async signingout(){
    await this.auth.signOut();
    this.navCtrl.navigateRoot(['/auth'], { animationDirection: 'forward' })
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
