import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BerandaPage } from './beranda.page';

import { BerandaPageRoutingModule } from './beranda-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    BerandaPageRoutingModule
  ],
  declarations: [BerandaPage]
})
export class BerandaPageModule {}
