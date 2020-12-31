import {HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Product} from '../../../../../@core/model/product.model';
import {FlamingoHttpService} from '../../../../../@flamingo/service/flamingo-http.service';
import {PaginatedList} from '../../../../../@shared/model/paginated-list.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: FlamingoHttpService) {
  }

  list(params?: HttpParams): Observable<PaginatedList<Product>> {
    return this.http.get<PaginatedList<Product>>('/products/paginated', params);
  }

  view(id: string): Observable<Product> {
    return this.http.get<Product>('/products/' + id);
  }
}
