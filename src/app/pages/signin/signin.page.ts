import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorResponse } from "@core/interfaces/error.interface";
import { NavController, ToastController } from '@ionic/angular';
import { SigninService } from './signin.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
})
export class SigninPage {

  signinForm: FormGroup = this.formBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required]]
  })

  showPassword = false;

  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private toast: ToastController,
    private signin: SigninService
  ) { }

  signingin(): void {
    if(this.signinForm.invalid) return;
    let { email, password } = this.signinForm.value;

    this.signin.login(email, password)
    .subscribe(res => {
      console.log(res)
      this.navCtrl.navigateRoot('/beranda', { animationDirection: 'forward' })
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

  goBack(){
    this.navCtrl.back();
  }

}
