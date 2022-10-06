import { NgModule } from '@angular/core';
import { AvatarModule } from 'ngx-avatar';
import { BaseModule } from '../../@core';

const Modules = [
  BaseModule,
  AvatarModule
]

@NgModule({
  imports: [
    ...Modules
  ]
})
export class UserModule { }
