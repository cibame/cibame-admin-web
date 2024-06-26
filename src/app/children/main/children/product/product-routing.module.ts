import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { ProductListComponent } from './children/list/product-list.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ProductListComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule {
}
