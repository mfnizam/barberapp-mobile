import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UbahBarberPageRoutingModule } from './ubah-barber-routing.module';

import { UbahBarberPage } from './ubah-barber.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    UbahBarberPageRoutingModule
  ],
  declarations: [UbahBarberPage]
})
export class UbahBarberPageModule {}
