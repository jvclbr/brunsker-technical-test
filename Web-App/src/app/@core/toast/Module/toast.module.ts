import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent } from '../Components';
import { ToastService } from '../Service';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

const Material = [
  MatSnackBarModule,
  MatIconModule,
  MatButtonModule
]

const Components = [
  ToastComponent
]

const Providers = [
  ToastService
]

const Modules = [
  CommonModule,
  ...Material

]

@NgModule({
  declarations: [
    ...Components
  ],
  imports: [
    ...Modules
  ],
  entryComponents: [
    Components
  ],
  providers: [
    ...Providers
  ]
})
export class ToastModule { }
