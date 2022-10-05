import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteNamesEnum, MainLayoutComponent } from './@core';
import { AuthModule } from './auth';
import { RealEstateModule } from './real-estate';

const routes: Routes = [
  {
    path: RouteNamesEnum.BASE,
    component: MainLayoutComponent,
    children:[
      {
        path: RouteNamesEnum.REAL_ESTATE,
        loadChildren: () => RealEstateModule
      },
      {
        path: '**',
        redirectTo: RouteNamesEnum.REAL_ESTATE
      }
    ]
  },
  {
    path: RouteNamesEnum.AUTH,
    loadChildren: () => AuthModule
  },
  {
    path: '**',
    redirectTo: RouteNamesEnum.BASE
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
