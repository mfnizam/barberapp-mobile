import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BerandaPage } from './beranda.page';

const routes: Routes = [
  {
    path: '',
    component: BerandaPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BerandaPageRoutingModule {}
