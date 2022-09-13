import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RiwayatPage } from './riwayat.page';

import { RiwayatPageRoutingModule } from './riwayat-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: RiwayatPage }]),
    RiwayatPageRoutingModule,
  ],
  declarations: [RiwayatPage]
})
export class RiwayatPageModule {}
