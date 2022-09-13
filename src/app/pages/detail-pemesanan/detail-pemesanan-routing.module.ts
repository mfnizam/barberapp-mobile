import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailPemesananPage } from './detail-pemesanan.page';

const routes: Routes = [
  {
    path: '',
    component: DetailPemesananPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailPemesananPageRoutingModule {}
