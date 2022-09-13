import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PesanSekarangPageRoutingModule } from './pesan-sekarang-routing.module';

import { PesanSekarangPage } from './pesan-sekarang.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PesanSekarangPageRoutingModule
  ],
  declarations: [PesanSekarangPage]
})
export class PesanSekarangPageModule {}
