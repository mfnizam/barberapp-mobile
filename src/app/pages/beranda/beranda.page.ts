import { Component } from '@angular/core';
import { ErrorResponse } from '@core/interfaces/error.interface';
import { User } from '@core/interfaces/user.interface';
import { ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { BerandaService } from './beranda.service';

@Component({
  selector: 'app-beranda',
  templateUrl: 'beranda.page.html'
})
export class BerandaPage  {
  // TODO: buat search dengan form builder
  searchForm = "";
  barbers$: Observable<User[]> = new BehaviorSubject<User[]>([] as User[]);

  constructor(
    private beranda: BerandaService,
    private toast: ToastController
  ) {
    this.barbers$ = this.beranda.barbers$;

    this.beranda.getBarbers({ name: this.searchForm })
    .subscribe(res => {
      console.log(res)
    }, (err: ErrorResponse) => {
      console.log(err)
      this.showToast(err.error.message)
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
