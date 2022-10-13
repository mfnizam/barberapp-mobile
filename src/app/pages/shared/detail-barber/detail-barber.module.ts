import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailBarberPageRoutingModule } from './detail-barber-routing.module';

import { DetailBarberPage } from './detail-barber.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailBarberPageRoutingModule
  ],
  declarations: [DetailBarberPage]
})
export class DetailBarberPageModule {}
