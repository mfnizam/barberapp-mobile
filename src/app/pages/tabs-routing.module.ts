import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'beranda',
        loadChildren: () => import('./beranda/beranda.module').then(m => m.BerandaPageModule)
      },
      {
        path: 'pesanan',
        loadChildren: () => import('./pesanan/pesanan.module').then(m => m.PesananPageModule)
      },
      {
        path: 'riwayat',
        loadChildren: () => import('./riwayat/riwayat.module').then(m => m.RiwayatPageModule)
      },
      {
        path: 'profil',
        loadChildren: () => import('./profil/profil.module').then(m => m.ProfilPageModule)
      },
      {
        path: '',
        redirectTo: '/beranda',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/beranda',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
