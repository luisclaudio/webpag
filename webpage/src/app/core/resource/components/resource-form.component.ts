import { Injectable, Injector, OnDestroy, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil, tap } from 'rxjs/operators';
import { Observable, Subject, zip } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ResourceModel } from '../models/resource.model';
import { DefaultHandleConfig } from '../models/default-handle-config.model';

import { ResourceService } from '../services/resource.service';

@Injectable({
  providedIn: 'root'
})
export abstract class ResourceFormComponent<T extends ResourceModel> implements OnInit, OnDestroy {

    public isLoading = false;

    public resource_id: number | null = null;

    public initObservables: Observable<any>[] = [];
    public resourceForm: FormGroup = new FormGroup({});

    protected fb: FormBuilder;
    protected http: HttpClient;
    protected activatedRoute: ActivatedRoute;
    protected snackBar: MatSnackBar;
    public router: Router;

    public resource: T | null = null;
    protected unSubscribeAll$: Subject<any> = new Subject();
    protected resourceName = this.resourceService.resourceName;

    protected constructor(
        protected injector: Injector,
        protected resourceService: ResourceService<T>
    ) {
        this.fb = this.injector.get(FormBuilder);
        this.http = this.injector.get(HttpClient);
        this.snackBar = this.injector.get(MatSnackBar);
        this.activatedRoute = this.injector.get(ActivatedRoute);
        this.router = this.injector.get(Router);
    }

    get handleConfig(): DefaultHandleConfig {
        return {
            messages: {
                create: `${this.resourceName} salvo com sucesso.`,
                update: `${this.resourceName} atualizado com sucesso.`,
            },
            error: {
                create: `Erro ao salvar ${this.resourceName.toLowerCase()}.`,
                update: `Erro ao atualizar ${this.resourceName.toLowerCase()}.`
            }
        };
    }

    protected abstract get redirectRoutes(): { create: string, update: string };
    protected abstract buildResourceForm(): void;

    ngOnInit() {
      const id = this.activatedRoute.snapshot.paramMap.get('id');
      if (id) {
        this.resource_id = +id;
      }

        this.buildResourceForm();
        this.loadResource();
        this.executeRequest();
    }

    loadResource(): void {
        if (this.resource_id) {
            const resource$ = this.resourceService.get(this.resource_id).pipe(
                takeUntil(this.unSubscribeAll$),
                tap((response) => {
                    if (response) {
                        this.resource = response;
                        this.loadForm();
                    } else {
                        this.notify(`Não foi possível carregar os dados de ${this.resourceName.toLowerCase()}.`);
                    }
                },
                (error) => {
                    this.notify(`Erro ao obter dados de ${this.resourceName.toLowerCase()}.`);
                })
            );
            this.initObservables.push(resource$);
        }
    }

    public onSubmit(form = this.resourceForm): void {
        this.resource_id ? this.onUpdate(form) : this.onSave(form);
    }

    protected loadForm(): void {
      if (this.resource) {
        this.resourceForm.patchValue(this.resource);
      }
    }

    protected onSave(form: FormGroup): void {
        this.isLoading = true;
        this.resourceService.store(form.getRawValue()).subscribe(
            response => {
                this.actionsForSuccess(this.handleConfig, response);
            },
            error => {
                this.actionsForErrors(this.handleConfig, error);
            }
        );
    }

    protected onUpdate(form: FormGroup): void {
        this.isLoading = true;
        this.resourceService.update(form.getRawValue()).subscribe(
            response => {
                this.actionsForSuccess(this.handleConfig, response);
            },
            error => {
                this.actionsForErrors(this.handleConfig, error);
            }
        );
    }

    protected actionsForSuccess(config: DefaultHandleConfig, response: T): void {
        const redirectTo: string = this.resource_id ? this.redirectRoutes.update : this.redirectRoutes.create;
        const notifyMessage: string | null = this.resource_id ? config.messages.update : config.messages.create;
        this.notify(notifyMessage);
        this.router.navigate([redirectTo]);
        this.isLoading = false;
    }

    protected actionsForErrors(config: DefaultHandleConfig, errors: HttpErrorResponse): void {
        const notifyMessage: string | null = this.resource_id ? config.error.update : config.error.create;
        this.notify(notifyMessage);
        this.handleErrors(this.resourceForm, errors);
        this.isLoading = false;
    }

    private handleErrors(form: FormGroup, error: HttpErrorResponse) {
        try {
            if (error.status === 422) {
                const list = Object.keys(error.error);
                list.forEach((index) => {
                    const formControl = form.get(index);
                    if (formControl) {
                        formControl.enable();
                        formControl.setErrors({
                            serverError: error.error[index]
                        });
                    }
                    formControl!.markAsTouched();
                });
            } else if (error.status === 400) {
                this.notify(error.error.message);
            } else if (error.status === 413) {
                this.notify('O arquivo selecionado é muito grande. O limite é de 100MB.');
            } else {
                this.notify('Erro ao estabelecer conexão com o servidor.');
            }
        } catch (e) {
            this.notify('Erro inesperado. Entre em contato com um de nossos desenvolverdores.');
        }
    }

    executeRequest(): void {
        if (this.initObservables.length > 0) {
            this.isLoading = true;
            zip(...this.initObservables).subscribe(
                (r) => this.isLoading = false,
                (e) => {
                    this.isLoading = false;
                    this.notify('Erro ao processar requisições');
                }
            );
        }
    }

    protected notify(message: string | null): void {
      if (message) {
        this.snackBar.open(message, 'OK', { duration: 3000 });
      }
    }

    ngOnDestroy() {
        this.unSubscribeAll$.next();
    }
}
