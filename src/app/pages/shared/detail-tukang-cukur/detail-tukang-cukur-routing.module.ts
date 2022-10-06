import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailTukangCukurPage } from './detail-tukang-cukur.page';

const routes: Routes = [
  {
    path: '',
    component: DetailTukangCukurPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailTukangCukurPageRoutingModule {}
