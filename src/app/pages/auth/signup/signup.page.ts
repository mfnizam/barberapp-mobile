import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { SignupService } from './signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html'
})
export class SignupPage {

  signupForm: FormGroup = this.formBuilder.group({
    name: [null, [Validators.required]],
    address: [null, [Validators.required]],
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required]],
    passwordConfirmation: [null, [Validators.required]],
  })

  isBarber = false;
  showPassword = false;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private toast: ToastController,
    private signup: SignupService
  ) {
    this.isBarber = !!this.route.snapshot.queryParamMap.get('isBarber');
  }

  signingup(): void {
    let { name, address, email, password, passwordConfirmation } = this.signupForm.value
    if(password !== passwordConfirmation) {
      this.showToast('Konfirmasi password tidak valid');
      return
    }

    this.signup.register(name, address, email, password, this.isBarber)
    .subscribe(res => {
      console.log(res)
      this.navCtrl.navigateRoot('/beranda', { animationDirection: 'forward' })
    }, err => {
      console.log(err);
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
