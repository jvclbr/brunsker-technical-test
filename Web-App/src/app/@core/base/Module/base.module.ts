import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxMaskModule } from 'ngx-mask'

import { MaterialModule } from '../../material';
import { ToastModule } from '../../toast';

const NpmModules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  FlexLayoutModule,
  NgxMaskModule
]

const CustomModules = [
  MaterialModule,
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
