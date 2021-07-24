import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";

import { MaterialModule } from "./core/material-module";

import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AuthenticationInterceptor } from "./core/authentication/interceptors/authentication.interceptor";
import { AuthenticationErrorInterceptor } from "./core/authentication/interceptors/authentication-error.interceptor";

import { AuthorizationModule } from "./core/authorization/authorization.module";

import { PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 2,
  wheelPropagation: true
};

import { AppRoutingModule } from './app-routing.module';

import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';
import { HeaderComponent } from './layouts/full/header/header.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { SpinnerComponent } from './layouts/full/spinner/spinner.component';
import { BreadcrumbComponent } from './layouts/full/breadcrumb/breadcrumb.component';
import { SearchComponent } from './layouts/full/search/search.component';
import { AccordionDirective } from './layouts/full/accordion/accordion.directive';
import { AccordionAnchorDirective } from './layouts/full/accordion/accordion-anchor.directive';
import { AccordionLinkDirective } from './layouts/full/accordion/accordion-link.directive';

@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    BlankComponent,
    HeaderComponent,
    AppSidebarComponent,
    SpinnerComponent,
    BreadcrumbComponent,
    SearchComponent,
    AccordionDirective,
    AccordionAnchorDirective,
    AccordionLinkDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    PerfectScrollbarModule,
    MaterialModule,
    AuthorizationModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationErrorInterceptor, multi: true },
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
