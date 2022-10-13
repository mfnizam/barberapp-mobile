import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WorkingHours } from '@core/interfaces/user.interface';
import { UserService } from '@core/services/user.service';
import { NavController, ToastController } from '@ionic/angular';
import { UbahBarberService } from './ubah-barber.service';

@Component({
  selector: 'app-ubah-barber',
  templateUrl: './ubah-barber.page.html'
})
export class UbahBarberPage {

  workingHours: FormArray = this.formBuilder.array([
    this.formBuilder.group({
      dayOfWeek: [{ value: 0, disabled: true }],
      hourStart: [null],
      hourEnd: [null],
      close: [true]
    }),
    this.formBuilder.group({
      dayOfWeek: [{ value: 1, disabled: true }],
      hourStart: [null],
      hourEnd: [null],
      close: [false]
    }),
    this.formBuilder.group({
      dayOfWeek: [{ value: 2, disabled: true }],
      hourStart: [null],
      hourEnd: [null],
      close: [false]
    }),
    this.formBuilder.group({
      dayOfWeek: [{ value: 3, disabled: true }],
      hourStart: [null],
      hourEnd: [null],
      close: [false]
    }),
    this.formBuilder.group({
      dayOfWeek: [{ value: 4, disabled: true }],
      hourStart: [null],
      hourEnd: [null],
      close: [false]
    }),
    this.formBuilder.group({
      dayOfWeek: [{ value: 5, disabled: true }],
      hourStart: [null],
      hourEnd: [null],
      close: [false]
    }),
    this.formBuilder.group({
      dayOfWeek: [{ value: 6, disabled: true }],
      hourStart: [null],
      hourEnd: [null],
      close: [false]
    })
  ])

  barberForm: FormGroup = this.formBuilder.group({
    userId: [null, Validators.required],
    id: [null, Validators.required],
    detail: ['', Validators.required],
    price: [null, Validators.required],
    workingHours: this.workingHours
  })
  dayOfWeek = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private ubah: UbahBarberService,
    private user: UserService,
    private toast: ToastController
  ) {
    this.getBarber();
  }
  
  ionViewDidEnter(){
    this.getBarber();
  }

  async getBarber(){
    let user = await this.user.getUser();

    this.barberForm.patchValue({userId: user.id, ...user.barber});
  }

  modalHourStartEndIndex = 0;
  modalHourStartEndName = 'hourStart';
  modalHourStartEndValue = new Date(0).toLocaleString('sv').replace(' ', 'T');

  openModalHourStart(modal: any, i: number) {
    modal.present();
    this.modalHourStartEndIndex = i;
    this.modalHourStartEndName = 'hourStart';
  }
  openModalHourEnd(modal: any, i: number) {
    modal.present();
    this.modalHourStartEndIndex = i;
    this.modalHourStartEndName = 'hourEnd';
  }

  modalHourStartEndDidDismiss() {
    this.modalHourStartEndIndex = 0;
    this.modalHourStartEndName = 'hourStart';
    this.modalHourStartEndValue = new Date(0).toLocaleString('sv').replace(' ', 'T');;
  }

  selectHourStartEnd(modal: any) {
    this.workingHours.at(this.modalHourStartEndIndex).get(this.modalHourStartEndName)?.setValue(new Date(this.modalHourStartEndValue).getTime())
    this.modalHourStartEndValue = new Date(0).toLocaleString('sv').replace(' ', 'T')
    modal.dismiss();
  }

  update() {
    let value = this.barberForm.getRawValue();
    value.workingHours = value.workingHours.map((v: WorkingHours) => {
      let close = v.close || (v.hourStart == null || v.hourEnd == null);
      return {
        ...close? {} : {
          hourStart: v.hourStart,
          hourEnd: v.hourEnd,
        },
        dayOfWeek: v.dayOfWeek,
        close,
      }
    })
    console.log(value)
    this.ubah.update(value.userId, { 
      detail: value.detail, 
      price: value.price, 
      workingHours: value.workingHours
    })
    .subscribe(async res => {
      console.log(res)
      this.navCtrl.back();

      let toast = await this.toast.create({
        message: 'Berhasil update informasi user',
        buttons: [{ icon: 'close'}],
        duration: 3000,
        mode: 'ios',
        color: 'success'
      })

      toast.present();
    }, async err => {
      console.error(err);
      let toast = await this.toast.create({
        message: 'Gagal update informasi user',
        buttons: [{ icon: 'close'}],
        duration: 3000,
        mode: 'ios',
        color: 'danger'
      })

      toast.present();
    })
  }

}
