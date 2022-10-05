import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { LoadingSpinnerComponent } from '../Components';
import { InterceptorService } from '../Service';
import { AuthInterceptor, ErrorInterceptor, LoadingInterceptor } from '../Interceptors';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';

const Components = [
  LoadingSpinnerComponent
]

const Material = [
  MatProgressSpinnerModule,
  MatDialogModule
]

const Modules = [
  CommonModule,
  HttpClientModule,
  ...Material
]

const Providers = [
  InterceptorService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: LoadingInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
  },
]

@NgModule({
  declarations: [
    ...Components
  ],
  imports: [
    ...Modules
  ],
  providers: [
    ...Providers
  ]
})
export class InterceptorsModule { }
