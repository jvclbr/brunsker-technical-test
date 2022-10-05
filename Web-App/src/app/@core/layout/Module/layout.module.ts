import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MainLayoutComponent } from '../Components';
import { PlataformService } from '../Service';

const Components = [
  MainLayoutComponent
]

const Providers = [
  PlataformService
]

const Modules = [
  CommonModule,
  RouterModule.forChild([])
]

@NgModule({
  declarations: [
    ...Components
  ],
  imports: [
    ...Modules,
  ],
  providers: [
    ...Providers
  ],
  exports: [
    ...Components
  ]
})
export class LayoutModule { }
