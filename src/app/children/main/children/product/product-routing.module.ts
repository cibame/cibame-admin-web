import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { ProductListComponent } from './children/product-list/product-list.component';
import {ProductViewComponent} from './children/product-view/product-view.component';
import {ProductViewResolver} from './children/product-view/product-view.resolver';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ProductListComponent
  },
  {
    path: 'new',
    component: ProductViewComponent
  },
  {
    path: ':id',
    component: ProductViewComponent,
    resolve: {
      product: ProductViewResolver
    }
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
