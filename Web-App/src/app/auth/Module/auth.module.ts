import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BaseModule } from '../../@core';
import {
  AuthContainerComponent,
  SignInFormComponent,
  SignUpFormComponent
} from '../Components';
import { AuthRoutes } from '../Routes';

const Components = [
  AuthContainerComponent,
  SignInFormComponent,
  SignUpFormComponent
]

const Modules = [
  BaseModule,
  HttpClientModule,
  RouterModule.forChild(AuthRoutes),
]

@NgModule({
  declarations: [
    ...Components
  ],
  imports: [
    ...Modules
  ],
  exports: [
    ...Components
  ]
})
export class AuthModule { }
