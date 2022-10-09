import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UbahBarberPage } from './ubah-barber.page';

const routes: Routes = [
  {
    path: '',
    component: UbahBarberPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UbahBarberPageRoutingModule {}
