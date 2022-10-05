import { Routes } from '@angular/router';
import {
  AuthContainerComponent,
  SignInFormComponent,
  SignUpFormComponent
} from '../Components';
import { AuthRouteNamesEnum } from './auth-route-names.enum';

export const AuthRoutes: Routes = [
  {
    path: AuthRouteNamesEnum.BASE,
    component: AuthContainerComponent,
    children: [
      {
        path: AuthRouteNamesEnum.SIGN_IN,
        component: SignInFormComponent,
      },
      {
        path: AuthRouteNamesEnum.SIGN_UP,
        component: SignUpFormComponent,
      },
      {
        path: '**',
        redirectTo: AuthRouteNamesEnum.SIGN_IN
      }
    ]
  },
  {
    path: '**',
    redirectTo: AuthRouteNamesEnum.BASE
  }
]
