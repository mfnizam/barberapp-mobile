import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ubah-barber',
  templateUrl: './ubah-barber.page.html'
})
export class UbahBarberPage {

  workingHours: FormArray = this.formBuilder.array([
    this.formBuilder.group({
      dayOfWeek: [{ value: 0, disabled: true }],
      hourStart: [new Date().toLocaleString('sv').replace(' ', 'T')],
      hourEnd: [new Date().toLocaleString('sv').replace(' ', 'T')],
      close: [true]
    }),
    this.formBuilder.group({
      dayOfWeek: [{ value: 1, disabled: true }],
      hourStart: [new Date().toLocaleString('sv').replace(' ', 'T')],
      hourEnd: [new Date().toLocaleString('sv').replace(' ', 'T')],
      close: [false]
    }),
    this.formBuilder.group({
      dayOfWeek: [{ value: 2, disabled: true }],
      hourStart: [new Date().toLocaleString('sv').replace(' ', 'T')],
      hourEnd: [new Date().toLocaleString('sv').replace(' ', 'T')],
      close: [false]
    }),
    this.formBuilder.group({
      dayOfWeek: [{ value: 3, disabled: true }],
      hourStart: [new Date().toLocaleString('sv').replace(' ', 'T')],
      hourEnd: [new Date().toLocaleString('sv').replace(' ', 'T')],
      close: [false]
    }),
    this.formBuilder.group({
      dayOfWeek: [{ value: 4, disabled: true }],
      hourStart: [new Date().toLocaleString('sv').replace(' ', 'T')],
      hourEnd: [new Date().toLocaleString('sv').replace(' ', 'T')],
      close: [false]
    }),
    this.formBuilder.group({
      dayOfWeek: [{ value: 5, disabled: true }],
      hourStart: [new Date().toLocaleString('sv').replace(' ', 'T')],
      hourEnd: [new Date().toLocaleString('sv').replace(' ', 'T')],
      close: [false]
    }),
    this.formBuilder.group({
      dayOfWeek: [{ value: 6, disabled: true }],
      hourStart: [new Date().toLocaleString('sv').replace(' ', 'T')],
      hourEnd: [new Date().toLocaleString('sv').replace(' ', 'T')],
      close: [false]
    })
  ])

  barberForm: FormGroup = this.formBuilder.group({
    detail: ['', Validators.required],
    workingHours: this.workingHours
  })
  dayOfWeek = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
  constructor(
    private formBuilder: FormBuilder
  ) { }

  modalHourStartEndIndex = 0;
  modalHourStartEndName = 'hourStart';
  modalHourStartEndValue = new Date().toLocaleString('sv').replace(' ', 'T');

  openModalHourStart(modal: any, i: number){
    modal.present();
    this.modalHourStartEndIndex = i;
    this.modalHourStartEndName = 'hourStart';
  }

  modalHourStartEndDidDismiss(){
    this.modalHourStartEndIndex = 0;
    this.modalHourStartEndName = 'hourStart';
    this.modalHourStartEndValue = new Date().toLocaleString('sv').replace(' ', 'T');    ;
  }

  selectHourStartEnd(modal: any){
    this.workingHours.at(this.modalHourStartEndIndex).get(this.modalHourStartEndName)?.setValue(this.modalHourStartEndValue)
    modal.dismiss();
  }

}
