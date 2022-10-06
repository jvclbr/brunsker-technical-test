import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BaseModule } from '../../base';
import { MainLayoutComponent, SideNavMenuComponent } from '../Components';
import { PlataformService, MenuService } from '../Service';

const Components = [
  MainLayoutComponent,
  SideNavMenuComponent
]

const Providers = [
  PlataformService,
  MenuService
]

const Modules = [
  BaseModule,
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
