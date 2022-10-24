import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorResponse } from '@core/interfaces/error.interface';
import { User } from '@core/interfaces/user.interface';
import { UserService } from '@core/services/user.service';
import { ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Order } from '../pesanan/pesanan.interface';
import { RiwayatService } from './riwayat.service';

@Component({
  selector: 'app-riwayat',
  templateUrl: 'riwayat.page.html'
})
export class RiwayatPage {
  userData: User = this.user.user;

  // TODO: buat search dengan form builder
  searchForm = '';
  orders$: Observable<Order[]> = new BehaviorSubject<Order[]>([] as Order[]);

  formReview: FormGroup = this.formBuilder.group({
    order: [null, Validators.required],
    star: [1, Validators.required],
    content: [null],
  })
  reviewStar: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private riwayat: RiwayatService,
    private toast: ToastController,
    private user: UserService
  ) {
    this.orders$ = this.riwayat.orders$;

    this.riwayat.getOrders({})
      .subscribe(res => {
        console.log(res)
      }, (err: ErrorResponse) => {
        console.log(err)
        // this.showToast(err.error.message)
      })
  }

  ionViewDidEnter() {
    this.userData = this.user.user;
  }

  openReview(modal: any, orderId: string){
    modal.present();
    this.formReview.get('order')?.setValue(orderId)
  }

  sendReview(modal: any){
    this.riwayat.createReview(this.formReview.value)
    .subscribe(res => {
      console.log(res);
      modal.dismiss();
      this.riwayat.getOrders({})
      .subscribe(res => {}, err => { console.log(err) })
    }, err => {
      console.log(err);
      this.showToast(err.error.message)
    })
  }

  modalReviewDismiss(){
    this.formReview.reset();
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
