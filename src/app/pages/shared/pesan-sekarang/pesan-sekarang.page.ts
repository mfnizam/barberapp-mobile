import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '@core/interfaces/user.interface';
import { UserService } from '@core/services/user.service';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { PesanSekarangService } from './pesan-sekarang.service';

@Component({
  selector: 'app-pesan-sekarang',
  templateUrl: './pesan-sekarang.page.html'
})
export class PesanSekarangPage {

  
  barberId: string;
  barber: User = {} as User;
  loadingDataBarber = true;

  jumlahPemesanan = 1;

  today = new Date().getDay();
  hourNow = new Date(0).setHours(new Date().getHours(), new Date().getMinutes());

  dayOfWeek = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamin', 'Jumat', 'Sabtu']

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private pesan: PesanSekarangService,
    private toast: ToastController,
    private loading: LoadingController,
    private user: UserService
  ) {
    this.barberId = this.route.snapshot.params.id;
    this.getBarber(this.barberId)
  }

  ionViewDidEnter(){
  }

  getBarber(id: string){
    this.loadingDataBarber = true;
    this.pesan.getBarber(id)
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

  kurangiJumlahPemesanan(){
    if(this.jumlahPemesanan > 1) this.jumlahPemesanan -= 1
  }

  tambahJumlahPemesanan(){
    this.jumlahPemesanan += 1
  }

  async pesanSekarang(){
    let pesan = await this.loading.create({
      message: 'Memproses pemesanan anda...',
      mode: 'ios',
      backdropDismiss: false
    })

    pesan.present();
    
    this.pesan.pesan({
      amount: this.jumlahPemesanan,
      barber: this.barber.id,
      user: this.user.user.id,
      price: this.barber.barber.price
    })
    .subscribe(async res => {
      console.log(res);
      pesan.dismiss();

      this.navCtrl.navigateForward(['/pesanan'], { replaceUrl: true })

      let toast = await this.toast.create({
        message: 'Berhasil Memproses Pemesanan.',
        mode: 'ios',
        duration: 3000,
        color: 'success',
        buttons: [{ icon: 'close'}]
      })

      toast.present();
    }, async err => {
      console.log(err)
      pesan.dismiss();

      let toast = await this.toast.create({
        message: 'Gagal Memproses Pemesanan.',
        mode: 'ios',
        duration: 3000,
        color: 'danger',
        buttons: [{ icon: 'close'}]
      })

      toast.present();
    })
  }

}
