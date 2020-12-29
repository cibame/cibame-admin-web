import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort, Sort, SortDirection} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {flamingoAnimations} from '../../@flamingo/animations';

@Component({
  selector: 'app-admin-table',
  templateUrl: './admin-table.component.html',
  styleUrls: ['./admin-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: flamingoAnimations
})
export class AdminTableComponent<T> implements OnInit, AfterViewInit, OnChanges {
  @ViewChild(MatSort) sort?: MatSort;
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  @Input() set config(value: AdminTableConfiguration) {
    this._config = {...this._config, ...value};
  }

  get config(): AdminTableConfiguration {
    return this._config;
  }

  private _config: AdminTableConfiguration = new DefaultTableConfiguration();

  @Input() data: Array<T> = [];
  @Input() isLoading = false;
  // Paginator input
  @Input() pageIndex = 0;
  @Input() pageSize = 10;
  @Input() length = 0;
  @Input() pageSizeOptions = [10, 25, 50, 100];
  // Sort input
  @Input() sortActive = '';
  @Input() sortDirection: SortDirection = '';

  @Output() sortChange: EventEmitter<Sort> = new EventEmitter<Sort>();
  @Output() pageChange: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();
  @Output() clickItem: EventEmitter<T> = new EventEmitter<T>();

  dataSource: MatTableDataSource<T> = new MatTableDataSource<T>();
  displayedColumns: Array<string> = [];

  constructor() {

  }

  ngOnInit(): void {
    this.dataSource.data = this.data;
  }

  ngAfterViewInit(): void {
    this.sort?.sortChange.subscribe((sort: Sort) => this.sortChange.emit(sort));
    this.paginator?.page.subscribe((page: PageEvent) => this.pageChange.emit(page));

  }

  ngOnChanges(c: SimpleChanges): void {
    this.dataSource.data = this.data;
    this.prepareData();
  }

  formatData(value: any, col: AdminTableColumn): void {
    return col.format ? col.format(value) : value[col.column];
  }

  private prepareData(): void {
    if ((!this.config.columns || !this.config.columns.length) && this.dataSource.data.length) {
      this.config.columns = Object.keys(this.dataSource.data[0])
        .map(i => {
          return {column: i} as AdminTableColumn;
        });
    }
    this.displayedColumns = this.config.columns ? this.config.columns.map(i => i.column) : [];
  }

}

class DefaultTableConfiguration implements AdminTableConfiguration {
  showPaginator = false;
  hidePageSize = false;
  showFirstLastButton = false;
}

export interface AdminTableConfiguration {
  columns?: AdminTableColumn[];
  showPaginator?: boolean;
  hidePageSize?: boolean;
  showFirstLastButton?: boolean;
  stickyHeader?: boolean;
  clickable?: boolean;
  flex?: boolean;
}

interface AdminTableColumn {
  column: string;
  name?: string;
  format?: (data: any) => any;
  sortable?: boolean;
  headerClass?: string;
  bodyClass?: string;
  flex?: string;
  align?: 'start' | 'center' | 'end';
}
