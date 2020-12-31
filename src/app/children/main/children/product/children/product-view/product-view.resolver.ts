import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {EMPTY, Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Product} from '../../../../../../../@core/model/product.model';
import {ProductService} from '../../product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductViewResolver implements Resolve<Product> {

  constructor(private service: ProductService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> {
    const id = route.paramMap.get('id');
    if (!id) {
      this.router.navigate(['/']);
      return EMPTY;
    }
    return this.service.view(id)
      .pipe(
        catchError(_ => {
          this.router.navigate(['/']);
          return EMPTY;
        })
      );
  }
}
