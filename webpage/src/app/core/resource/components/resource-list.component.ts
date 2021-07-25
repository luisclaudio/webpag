import { ChangeDetectorRef, Injectable, Injector, OnDestroy, OnInit, ViewChildren } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of, Subject, zip } from 'rxjs';
import { catchError, takeUntil, tap } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { ResourceModel } from '../models/resource.model';
import { DefaultHandleConfig } from '../models/default-handle-config.model';

import { ResourceService } from '../services/resource.service';

import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { AuthenticationService } from '../../authentication/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export abstract class ResourceListComponent<T extends ResourceModel> implements OnInit, OnDestroy {

    @ViewChildren(MatPaginator) public paginator: MatPaginator | null = null;

    public isLoading = false;

    protected paginationLimitPerPageProperty = 'limit';
    protected paginationPageNumberProperty = 'page';

    public length = 0;
    public page = 1;
    public pageSize = 5;
    public pageSizeOptions: number[] = [25, 50, 100];

    public dataSource: MatTableDataSource<T> = new MatTableDataSource<T>();

    protected initObservables: Observable<any>[] = [];
    protected unSubscribeAll$: Subject<any> = new Subject();

    protected fb: FormBuilder;
    protected snackBar: MatSnackBar;
    protected dialog: MatDialog;
    protected changeDetectorRef: ChangeDetectorRef;

    protected resourceName = this.resourceService.resourceName;
    public resourceSearchForm: FormGroup = new FormGroup({});

    protected usePushDetector: boolean = false;

    protected constructor(
        protected injector: Injector,
        private resourceService: ResourceService<T>,
    ) {
        this.fb = this.injector.get(FormBuilder);
        this.snackBar = this.injector.get(MatSnackBar);
        this.dialog = this.injector.get(MatDialog);
        this.changeDetectorRef = this.injector.get(ChangeDetectorRef);
    }

    ngOnInit() {
        const resources$ = this.getResources({
          [this.paginationLimitPerPageProperty]: this.pageSize,
          [this.paginationPageNumberProperty]: this.page
        });
        this.initObservables.push(resources$);
        this.isLoading = true;
        this.buildSearchForm();
        this.zipRequests(this.initObservables);
    }

    protected get handleConfig(): DefaultHandleConfig {
        return {
            messages: {
                create: null,
                update: null,
                delete: `${this.resourceName} deletado com sucesso.`,
            },
            error: {
                create: `Erro ao salvar ${this.resourceName.toLowerCase()}.`,
                update: null,
                delete: `Erro ao deletar ${this.resourceName.toLowerCase()}.`
            },
            modal: {
                title: `Excluir ${this.resourceName.toLowerCase()}?`
            }
        };
    }

    protected abstract get displayedColumns(): string[];

    protected abstract buildSearchForm(): void;

    protected getDataToSearch() {
        const data = this.resourceSearchForm.value;

        for (const key in data) {
            if (data.hasOwnProperty(key) && !data[key]) {
                delete data[key];
            }
        }

        return data;
    }

    public pageChanged(event$: any) {
        this.isLoading = true;

        const data = this.getDataToSearch();
        this.getResources({
          [this.paginationLimitPerPageProperty]: event$.pageSize,
          [this.paginationPageNumberProperty]: event$.pageIndex + 1,
          ...data
        }).subscribe(
        () => this.pagination().subscribe(),
        () => {},
        () => {
            this.runChangeDetector();
            this.isLoading = false;
        });
    }

    public onOpenDialog(param: number) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.width = screen.width < 420 ? '100vw' : '45%';

        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            ...dialogConfig,
            data: { title: this.handleConfig!.modal!.title }
        });

        dialogRef.afterClosed().subscribe(
            res => {
                if (res) {
                    this.onDelete(param);
                }
            }
        );
    }

    public onSearch(): void {
        this.isLoading = true;

        const data = this.getDataToSearch();
        this.getResources({
          [this.paginationLimitPerPageProperty]: this.pageSize,
          [this.paginationPageNumberProperty]: this.page,
          ...data
        }).subscribe(
            () => this.pagination().subscribe(),
            () => {},
            () => {
                this.runChangeDetector();
                this.isLoading = false;
            });
    }

    protected runChangeDetector(): void {
        if (this.usePushDetector) {
            this.changeDetectorRef.detectChanges();
        }
    }

    protected getResources(param: any): Observable<number | T[]> {
        return this.resourceService.fetch(param)
            .pipe(
                takeUntil(this.unSubscribeAll$),
                tap((response) => {
                    if (response.length > 0) {
                        this.dataSource = new MatTableDataSource(response);
                    } else {
                        this.dataSource = new MatTableDataSource();
                        this.notify(`Nenhum ${this.resourceName.toLowerCase()} encontrado no sistema.`);
                    }
                    this.runChangeDetector();
                }),
                catchError(error => {
                    this.notify(`Error ao obter os dados de ${this.resourceName.toLowerCase()}.`);
                    return of(0);
                })
            );
    }

    protected zipRequests(requests: Observable<any>[]): void {
        this.isLoading = true;

        zip(...requests).subscribe(
        () => this.pagination().subscribe(),
        () => {},
        () => {
            this.runChangeDetector();
            this.isLoading = false;
        });
    }

    protected pagination() {
      return this.resourceService.getPagination().pipe(
        tap((meta) => {
          this.length = (meta) ? meta : 0;
        })
      );
    }

    protected onDelete(id: number) {
        this.isLoading = true;
        this.resourceService.delete(id)
            .subscribe(() => {
              if (this.handleConfig.messages.delete) {
                this.notify(this.handleConfig.messages.delete);
              }
            }, (error: HttpErrorResponse) => {
              if (error.status === 400) {
                  this.notify(error.error.message);
              } else {
                if (this.handleConfig.messages.delete) {
                  this.notify(this.handleConfig.messages.delete);
                }
              }
            }, () => {
                this.isLoading = false;
                this.onSearch();
                this.runChangeDetector();
            });
    }

    public onReset() {
        this.isLoading = true;
        this.resourceSearchForm.reset();

        this.getResources({
          [this.paginationLimitPerPageProperty]: this.length,
          [this.paginationPageNumberProperty]: this.pageSize
        }).subscribe(
            () => this.pagination().subscribe(),
            () => {},
            () => {
                this.runChangeDetector();
                this.isLoading = false;
            });
    }

    protected notify(message: string) {
        this.snackBar.open(message, '', { duration: 3000 });
    }

    ngOnDestroy() {
        this.unSubscribeAll$.next();
    }
}
