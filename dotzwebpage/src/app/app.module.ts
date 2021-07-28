import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MaterialModule } from "./material-module";
import { FlexLayoutModule } from "@angular/flex-layout";

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ProductsComponent } from './components/products/products.component';
import { OrdersComponent } from './components/orders/orders.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BlankPageComponent } from './layouts/blank-page/blank-page.component';
import { FullPageComponent } from './layouts/full-page/full-page.component';
import { LoadingSpinnerComponent } from './layouts/loading-spinner/loading-spinner.component';
import { UnauthorizedComponent } from './layouts/unauthorized/unauthorized.component';
import { AddressComponent } from './components/address/address.component';
import { HeaderComponent } from './layouts/header/header.component';
import { DisableAuthorizationComponent } from './layouts/disable-authorization/disable-authorization.component';

import { HideAuthorizationDirective } from './directives/hide-authorization.directive';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    OrdersComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    BlankPageComponent,
    FullPageComponent,
    LoadingSpinnerComponent,
    UnauthorizedComponent,
    AddressComponent,
    HeaderComponent,
    HideAuthorizationDirective,
    DisableAuthorizationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
