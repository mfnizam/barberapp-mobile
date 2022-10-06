import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UbahProfilPage } from './ubah-profil.page';

const routes: Routes = [
  {
    path: '',
    component: UbahProfilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UbahProfilPageRoutingModule {}
