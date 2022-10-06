import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfilPage } from './profil.page';

import { ProfilPageRoutingModule } from './profil-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ProfilPageRoutingModule
  ],
  declarations: [ProfilPage]
})
export class ProfilPageModule {}
