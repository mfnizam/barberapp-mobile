import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path: 'signin',
    loadChildren: () => import('./pages/signin/signin.module').then( m => m.SigninPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'ubah-profil',
    loadChildren: () => import('./pages/ubah-profil/ubah-profil.module').then( m => m.UbahProfilPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'detail-pemesanan',
    loadChildren: () => import('./pages/detail-pemesanan/detail-pemesanan.module').then( m => m.DetailPemesananPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'detail-tukang-cukur',
    loadChildren: () => import('./pages/detail-tukang-cukur/detail-tukang-cukur.module').then( m => m.DetailTukangCukurPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'pesan-sekarang',
    loadChildren: () => import('./pages/pesan-sekarang/pesan-sekarang.module').then( m => m.PesanSekarangPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    loadChildren: () => import('./pages/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'beranda'
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
