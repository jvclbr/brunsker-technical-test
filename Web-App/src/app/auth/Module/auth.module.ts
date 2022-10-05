import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BaseModule } from '../../@core';
import {
  AuthContainerComponent,
  SignInFormComponent,
  SignUpFormComponent
} from '../Components';
import { AuthService } from '../Service'
import { AuthRoutes } from '../Routes';

const Components = [
  AuthContainerComponent,
  SignInFormComponent,
  SignUpFormComponent
]

const Modules = [
  BaseModule,
  RouterModule.forChild(AuthRoutes),
]

const Providers = [
  AuthService
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
export class AuthModule { }
