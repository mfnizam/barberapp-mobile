import { Component, OnDestroy } from '@angular/core';
import { User } from '@core/interfaces/user.interface';
import { AuthService } from '@core/services/auth.service';
import { UserService } from '@core/services/user.service';
import { AlertController, NavController } from '@ionic/angular';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-profil',
  templateUrl: 'profil.page.html'
})
export class ProfilPage {

  profil$: Observable<User> = new BehaviorSubject<User>({} as User);
  
  constructor(
    private navCtrl: NavController,
    private user: UserService,
    private auth: AuthService,
    private alert: AlertController
  ) {
    this.profil$ = this.user.user$;
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
