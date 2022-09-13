import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PesananPage } from './pesanan.page';

import { PesananPageRoutingModule } from './pesanan-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    PesananPageRoutingModule
  ],
  declarations: [PesananPage]
})
export class PesananPageModule {}
