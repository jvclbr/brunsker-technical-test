import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BaseModule } from '../../@core';
import {
  RealEstateCardComponent,
  RealEstateContainerComponent,
  RealEstateFormComponent
} from '../Components';
import { RealEstateService } from '../Service'
import { RealEstateRoutes } from '../Routes';

const Components = [
  RealEstateCardComponent,
  RealEstateContainerComponent,
  RealEstateFormComponent
]

const Modules = [
  BaseModule,
  RouterModule.forChild(RealEstateRoutes),
]

const Providers = [
  RealEstateService
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
  ],
  exports: [
    ...Components
  ]
})
export class RealEstateModule { }
