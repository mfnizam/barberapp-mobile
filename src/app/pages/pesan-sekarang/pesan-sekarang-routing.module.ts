import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PesanSekarangPage } from './pesan-sekarang.page';

const routes: Routes = [
  {
    path: '',
    component: PesanSekarangPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PesanSekarangPageRoutingModule {}
