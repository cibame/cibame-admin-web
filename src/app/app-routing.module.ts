import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoggedGuard} from '../@core/guard/logged.guard';
import {NotLoggedGuard} from '../@core/guard/not-logged.guard';

const routes: Routes = [
  // Auth
  {
    path: 'auth',
    canActivate: [NotLoggedGuard],
    loadChildren: () => import('./children/auth/auth.module').then((m) => m.AuthModule)
  },
  // Main
  {
    path: '',
    canActivate: [LoggedGuard],
    loadChildren: () => import('./children/main/main.module').then((m) => m.MainModule)
  },
  // Wild card
  {
    path: '**',
    redirectTo: '/auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
