import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '@core/interfaces/user.interface';
import { UserService } from '@core/services/user.service';
import { BehaviorSubject, Observable } from 'rxjs';

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
    dateBirth: [null],
    gender: [null],
  })

  constructor(
    private formBuilder: FormBuilder,
    private user: UserService
  ) {
    this.profilForm.patchValue(this.user.user)
  }

}
