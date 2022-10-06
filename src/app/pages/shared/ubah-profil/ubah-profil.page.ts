import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '@core/interfaces/user.interface';
import { UserService } from '@core/services/user.service';
import { NavController, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { UbahProfilService } from './ubah-profil.service';

@Component({
  selector: 'app-ubah-profil',
  templateUrl: './ubah-profil.page.html'
})
export class UbahProfilPage {

  profil$: Observable<User> = new BehaviorSubject<User>({} as User);
  profilForm: FormGroup = this.formBuilder.group({
    name: [null, Validators.required],
    address: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
    phoneNumber: [null, Validators.required],
    dateOfBirth: [null],
    gender: [null],
  })
  updateLoading = false;

  maxTgl = new Date().toLocaleString('sv').replace(' ', 'T');

  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private user: UserService,
    private ubahProfil: UbahProfilService,
    private toast: ToastController,
  ) {}
  
  ionViewDidEnter(){
    this.profilForm.patchValue(this.user.user)
  }

  update(){
    this.updateLoading = true;
    let value = this.profilForm.value;
    Object.keys(value).forEach((key) => (value[key] == null) && delete value[key]);
    this.ubahProfil.update(this.user.user.id, value)
    .subscribe(res => {
      console.log(res);
      this.updateLoading = false;
      this.navCtrl.back();
    }, async err => {
      console.log(err)
      this.updateLoading = false;
      let toast = await this.toast.create({
        message: err.error.message,
        mode: 'ios',
        duration: 3000
      })

      toast.present();
    })
  }

}
