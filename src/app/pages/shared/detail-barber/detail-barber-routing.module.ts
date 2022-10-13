import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailBarberPage } from './detail-barber.page';

const routes: Routes = [
  {
    path: '',
    component: DetailBarberPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailBarberPageRoutingModule {}
