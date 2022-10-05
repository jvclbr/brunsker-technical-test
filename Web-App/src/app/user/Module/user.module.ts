import { NgModule } from '@angular/core';
import { AvatarModule } from 'ngx-avatar';
import { BaseModule } from '../../@core';

import { UserService } from '../Service';

const Modules = [
  BaseModule,
  AvatarModule
]

const Providers = [
  UserService
]

@NgModule({
  imports: [
    ...Modules
  ],
  providers: [
    ...Providers
  ]
})
export class UserModule { }
