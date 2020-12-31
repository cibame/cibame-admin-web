import {HttpParams} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {PageEvent} from '@angular/material/paginator';
import {Sort} from '@angular/material/sort';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {interval} from 'rxjs';
import {debounce, finalize, tap} from 'rxjs/operators';
import {AdminTableConfiguration} from 'src/@shared/admin-table/admin-table.component';
import {ListQuery} from 'src/@shared/model/list-query.model';
import {ListQueryParams} from 'src/@shared/model/list-query.params';
import {Product} from '../../../../../../../@core/model/product.model';
import {ProductService} from '../../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  private defaultPageSize = 10;
  filterFormControl: FormControl = new FormControl();
  items: Product[] = [];
  length = 0;
  params: ListQuery = {};
  isLoading = false;

  config: AdminTableConfiguration = {
    showPaginator: true,
    stickyHeader: true,
    clickable: true,
    flex: true,
    columns: [
      {
        column: 'name',
        name: 'Nome',
        // format: row => row.name,
        sortable: true
      },
      {
        column: 'category.name',
        name: 'Categoria',
        format: row => row.category.name,
        sortable: true
      }
    ]
  };

  constructor(private productService: ProductService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.filterFormControl.valueChanges
      .pipe(
        debounce(() => interval(500))
      )
      .subscribe(res => this.addQueryParam({[ListQueryParams.filter]: res ? res : null}));

    this.activatedRoute.queryParamMap
      .pipe(
        tap(_ => this.params = {}),
        tap((params: ParamMap) => this.filterFormControl.setValue(params.get('filter') || null)),
        tap((params: ParamMap) => params.keys.forEach(key => this.params = {...this.params, [key]: params.get(key)}))
      )
      .subscribe((params: ParamMap) => this.loadData(params));
  }

  private loadData(queryParams?: ParamMap): void {
    this.isLoading = true;
    let params = new HttpParams();

    queryParams?.keys.forEach(key => {
      const value = queryParams?.get(key);
      if (value) {
        params = params.set(key, value);
      }
    });

    this.productService.list(params)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe(res => {
        this.items = res.items;
        this.length = res.totalItems;
      }, error => {
        console.log(error);
      });
  }

  ngOnInit(): void {
  }

  onSortChange(sort: Sort): void {
    this.addQueryParam({
      [ListQueryParams.sort]: sort.direction ? sort.active : null,
      [ListQueryParams.sortOrder]: sort.direction ? sort.direction : null
    });
  }

  onPageChange(pageEvent: PageEvent): void {
    this.addQueryParam({
      [ListQueryParams.pageSize]: pageEvent.pageSize !== this.defaultPageSize ? pageEvent.pageSize.toString() : null,
      [ListQueryParams.page]: pageEvent.pageIndex > 0 ? pageEvent.pageIndex.toString() : null
    });
  }

  onClickItem(item: Product): void {
    this.router.navigate([item.id], {relativeTo: this.activatedRoute});
  }

  addQueryParam(params: { [key: string]: string | null }): void {
    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: params,
        queryParamsHandling: 'merge'
      });
  }
}




