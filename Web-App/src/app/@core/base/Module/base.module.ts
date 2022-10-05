import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxMaskModule } from 'ngx-mask'

import { ToastModule } from '../../toast';

const NpmModules = [
  CommonModule,
  HttpClientModule,
  FormsModule,
  ReactiveFormsModule,
  FlexLayoutModule,
  NgxMaskModule
]

const CustomModules = [
  ToastModule,
]

const Modules = [
  ...NpmModules,
  ...CustomModules
]



@NgModule({
  imports: [
    ...Modules
  ],
  exports: [
    ...Modules
  ]
})
export class BaseModule { }
