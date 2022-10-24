import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '@core/interfaces/user.interface';
import { ToastController } from '@ionic/angular';
import { Review } from '../../public/pesanan/pesanan.interface';
import { DetailBarberService } from './detail-barber.service';

@Component({
  selector: 'app-detail-barber',
  templateUrl: './detail-barber.page.html',
})
export class DetailBarberPage {

  barberId: string;
  barber: User = {} as User;
  loadingDataBarber = true;

  review: Review[] = [];
  loadingDataReview = false;

  today = new Date().getDay();
  hourNow = new Date(0).setHours(new Date().getHours(), new Date().getMinutes());

  dayOfWeek = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamin', 'Jumat', 'Sabtu']

  constructor(
    private route: ActivatedRoute,
    private detail: DetailBarberService,
    private toast: ToastController
  ) {
    this.barberId = this.route.snapshot.params.id;
    this.getBarber(this.barberId);
    this.getReviewBarber(this.barberId)
  }

  ionViewDidEnter(){
  }

  getBarber(id: string){
    this.loadingDataBarber = true;
    this.detail.getBarber(id)
    .subscribe(barber => {
      console.log(barber);
      this.barber = barber;
      this.loadingDataBarber = false;
    }, async err => {
      console.log(err)
      this.loadingDataBarber = false;
      let toast = await this.toast.create({
        message: 'Gagal Memuat Detail Barber',
        color: 'danger',
        mode: 'ios',
        duration: 3000,
        buttons: [{ icon: 'close' }]
      })

      toast.present()
    })
  }

  getReviewBarber(id: string){
    this.loadingDataReview = true;
    this.detail.getReview(id)
    .subscribe(res => {
      console.log(res)
    }, err => {
      console.log(err)
    })
  }

}
