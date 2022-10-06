import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  RouteNamesEnum,
  MainLayoutComponent,
} from './@core';
import { AuthGuard } from './@core/base/Guards';
import { AuthModule } from './auth';
import { RealEstateModule } from './real-estate';

const routes: Routes = [
  {
    path: RouteNamesEnum.AUTH,
    canActivateChild: [AuthGuard],
    data: {isPublic: true},
    loadChildren: () => AuthModule
  },
  {
    path: RouteNamesEnum.REAL_ESTATE,
    component: MainLayoutComponent,
    children: [
      {
        path: RouteNamesEnum.BASE,
        canActivateChild: [AuthGuard],
        data: {isPublic: false},
        loadChildren: () => RealEstateModule
      }
    ]
  },
  {
    path: '**',
    redirectTo: RouteNamesEnum.REAL_ESTATE
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
