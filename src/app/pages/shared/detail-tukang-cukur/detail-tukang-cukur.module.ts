import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailTukangCukurPageRoutingModule } from './detail-tukang-cukur-routing.module';

import { DetailTukangCukurPage } from './detail-tukang-cukur.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailTukangCukurPageRoutingModule
  ],
  declarations: [DetailTukangCukurPage]
})
export class DetailTukangCukurPageModule {}
