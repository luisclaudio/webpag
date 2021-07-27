import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { takeUntil, tap, catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from "@angular/material/table";

import { ProductModel } from './../../models/product.model';
import { ProductsService } from './../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  public isLoading = false;
  private resourceName = 'Products';

  public length = 0;
  public page = 1;
  public pageSize = 5;
  public pageSizeOptions: number[] = [5, 25, 50, 100];
  private paginationLimitPerPageProperty = 'limit';
  private paginationPageNumberProperty = 'page';

  public dataSource: MatTableDataSource<ProductModel> = new MatTableDataSource();
  public displayedColumns: string[] = [
    'name',
    'price',
    'description',
  ];

  private usePushDetector: boolean = true;
  private unSubscribeAll$: Subject<any> = new Subject();

  constructor(
    private snackBar: MatSnackBar,
    private changeDetectorRef: ChangeDetectorRef,
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.getResources({
      [this.paginationLimitPerPageProperty]: this.pageSize,
      [this.paginationPageNumberProperty]: this.page
    }).subscribe(
      () => this.pagination().subscribe(),
      () => {},
      () => {
        this.runChangeDetector();
        this.isLoading = false;
    });
  }

  protected getResources(param: any): Observable<number | ProductModel[]> {
    return this.productsService.fetch(param)
        .pipe(
            takeUntil(this.unSubscribeAll$),
            tap((response) => {
                if (response && response.length > 0) {
                    this.dataSource = new MatTableDataSource<ProductModel>(response);
                } else {
                    this.dataSource = new MatTableDataSource<ProductModel>();
                    this.notify(`No ${this.resourceName.toLowerCase()} found on the system.`);
                }
            }),
            catchError(_ => {
                this.notify(`Error getting data from ${this.resourceName.toLowerCase()}.`);
                return of(0);
            })
        );
  }

  public pageChanged(event$: any) {
    this.isLoading = true;
    this.getResources({
      [this.paginationLimitPerPageProperty]: event$.pageSize,
      [this.paginationPageNumberProperty]: event$.pageIndex + 1
    }).subscribe(
      () => this.pagination().subscribe(),
      () => {},
      () => {
        this.runChangeDetector();
        this.isLoading = false;
    });
  }

  protected pagination() {
    return this.productsService.getPagination().pipe(
      takeUntil(this.unSubscribeAll$),
      tap((meta) => {
        this.length = (meta) ? meta : 0;
      })
    );
  }

  private runChangeDetector(): void {
    if (this.usePushDetector) {
        this.changeDetectorRef.detectChanges();
    }
  }

  protected notify(message: string) {
    this.snackBar.open(message, '', { duration: 3000 });
  }

  ngOnDestroy() {
      this.unSubscribeAll$.next();
  }

}
