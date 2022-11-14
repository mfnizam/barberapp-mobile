import { Component, OnDestroy } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { User } from '@core/interfaces/user.interface';
import { AuthService } from '@core/services/auth.service';
import { UserService } from '@core/services/user.service';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ProfilService } from './profil.service';

@Component({
  selector: 'app-profil',
  templateUrl: 'profil.page.html'
})
export class ProfilPage {

  profil$: Observable<User> = new BehaviorSubject<User>({} as User);
  dayOfWeek = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamin', 'Jumat', 'Sabtu']

  imgVerifikasi: string | null = null;
  verifikasiLoading: boolean = false;
  titleModalVerifikasi = 'Foto ID (KTP)';
  viewOnliModalVerifikasi = false;
  
  constructor(
    private navCtrl: NavController,
    private user: UserService,
    private auth: AuthService,
    private profil: ProfilService,
    private alert: AlertController,
    private toast: ToastController
  ) {
    this.profil$ = this.user.user$;
    this.user.user$
    .subscribe(res => {
      console.log(user)
    })
  }

  async openModalVerifikasi(modal: any){
    this.titleModalVerifikasi = 'Verifikasi Profil Anda';
    this.viewOnliModalVerifikasi = false;
    await modal.present();
  }

  async pilihPhoto() {
    const image = await Camera.getPhoto({
      quality: 60,
      allowEditing: true,
      resultType: CameraResultType.Base64, //CameraResultType.Uri,
      promptLabelPhoto: 'Pilih Dari Galeri',
      promptLabelPicture: 'Ambil Dari Kamera'
    });
    
    this.imgVerifikasi = "data:image/jpeg;base64," + image.base64String; // image.webPath;
  }

  dismissVerifikasi(){
    this.imgVerifikasi = null;
    this.titleModalVerifikasi = 'Lihat ID (KTP)';
    this.viewOnliModalVerifikasi = false;
  }

  batalVerifikasi(modal: any) {
    if(this.verifikasiLoading) return;
    modal.dismiss()
    this.imgVerifikasi = null;
  }

  async simpanVerifikasi(modal: any){
    if(this.imgVerifikasi){
      this.verifikasiLoading = true;
      let foto = await fetch(this.imgVerifikasi).then(res => res.blob());
      this.profil.uploadFoto(this.user.user.id, foto)
      .subscribe(res => {
        console.log(res)
        this.verifikasiLoading = false;
        modal.dismiss();
      }, async err => {
        console.log(err)
        modal.dismiss();
        this.verifikasiLoading = false;
        let toast = await this.toast.create({ message: 'Gagal Menyimpan Foto', mode: 'ios', duration: 3000, color: 'danger', buttons: [{ icon: 'close' }] });
        toast.present();
      })
    }
  }

  showPhotoID(modal: any, photoID: string){
    this.imgVerifikasi = photoID;
    this.viewOnliModalVerifikasi = true;
    modal.present();
  }

  async signingout(){
    let alert = await this.alert.create({
      message: 'Apakah anda yakin ingin keluar?',
      mode: 'ios',
      buttons: [{
        text: 'Batal',
        role: 'cancel'
      }, {
        text: 'Keluar',
        role: 'ok'
      }]
    })

    alert.present();

    let { role } = await alert.onDidDismiss();
    if(role !== 'ok') return;

    await this.auth.signOut();
    this.navCtrl.navigateRoot(['/auth'], { animationDirection: 'forward' })
  }
}
