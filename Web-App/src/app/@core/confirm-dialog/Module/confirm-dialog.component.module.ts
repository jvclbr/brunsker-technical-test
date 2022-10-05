import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from '../Components';
import { ConfirmDialogService } from '../Service';
import { MatDialogModule } from '@angular/material/dialog';

const Material = [
  MatDialogModule
]

const Components = [
  ConfirmDialogComponent
]

const Providers = [
  ConfirmDialogService
]

const Modules = [
  CommonModule,
  ...Material
]

@NgModule({
  imports: [
    ...Modules
  ],
  declarations: [
    ...Components
  ],
  exports: [
    ...Components
  ],
  entryComponents: [
    ...Components
  ],
  providers: [
    ...Providers
  ],
})
export class ConfirmDialogModule {}
