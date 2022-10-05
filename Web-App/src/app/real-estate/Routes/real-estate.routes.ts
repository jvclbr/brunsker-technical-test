import { Routes } from '@angular/router';
import {
  RealEstateContainerComponent,
  RealEstateFormComponent
} from '../Components';
import { RealEstateRouteNamesEnum } from './real-estate-route-names.enum';

export const RealEstateRoutes: Routes = [
  {
    path: RealEstateRouteNamesEnum.BASE,
    component: RealEstateContainerComponent,
  },
  {
    path: RealEstateRouteNamesEnum.CREATE,
    component: RealEstateFormComponent,
  },
  {
    path: `${RealEstateRouteNamesEnum.UPDATE}/:id`,
    component: RealEstateFormComponent,
  },
  {
    path: '**',
    redirectTo: RealEstateRouteNamesEnum.BASE
  }
]
