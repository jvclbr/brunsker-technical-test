import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxMaskModule } from 'ngx-mask'
import { AvatarModule } from 'ngx-avatar';
import { SimplebarAngularModule } from 'simplebar-angular';

import { MaterialModule } from '../../material';
import { ToastModule } from '../../toast';

const NpmModules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  FlexLayoutModule,
  NgxMaskModule,
  AvatarModule,
  SimplebarAngularModule
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
