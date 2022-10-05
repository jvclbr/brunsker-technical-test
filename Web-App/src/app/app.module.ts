import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { InterceptorsModule, LayoutModule } from './@core';


const Modules = [
  BrowserModule,
  AppRoutingModule,
  BrowserAnimationsModule,
  InterceptorsModule,
  LayoutModule
]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ...Modules
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
