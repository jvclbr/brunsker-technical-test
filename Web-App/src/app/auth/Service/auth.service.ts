import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  APIRouteNamesEnum,
  BaseService,
  RouteNamesEnum
} from '../../@core';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService<any>{
  protected readonly apiPath:string = APIRouteNamesEnum.AUTH;
  protected readonly mainPath:string = RouteNamesEnum.AUTH;

  constructor(
    protected override readonly httpClient: HttpClient,
    protected override readonly router: Router
  ){
    super(
      httpClient,
      router
    );
  }

}
