import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailPemesananPageRoutingModule } from './detail-pemesanan-routing.module';

import { DetailPemesananPage } from './detail-pemesanan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailPemesananPageRoutingModule
  ],
  declarations: [DetailPemesananPage]
})
export class DetailPemesananPageModule {}
