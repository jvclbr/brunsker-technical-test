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
    data: {isPublic: true},
    children: [
      {
        path: AuthRouteNamesEnum.SIGN_IN,
        data: {isPublic: true},
        component: SignInFormComponent,
      },
      {
        path: AuthRouteNamesEnum.SIGN_UP,
        data: {isPublic: true},
        component: SignUpFormComponent,
      },
      {
        path: '**',
        redirectTo: AuthRouteNamesEnum.SIGN_IN
      }
    ]
  }
]
