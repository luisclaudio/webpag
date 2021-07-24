import { NgModule } from '@angular/core';

import { MaterialModule } from '../material-module';

import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { GoBackButtonComponent } from './components/go-back-button/go-back-button.component';
import { LoadingSpinnerComponent } from "./components/loading-spinner/loading-spinner.component";

@NgModule({
  declarations: [
    ConfirmDialogComponent,
    GoBackButtonComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    MaterialModule
  ],
  exports: [
    ConfirmDialogComponent,
    GoBackButtonComponent,
    LoadingSpinnerComponent
  ],
})
export class ResourceModule {}
