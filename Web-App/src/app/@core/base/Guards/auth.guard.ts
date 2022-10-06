import { Injectable } from '@angular/core';
import {
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { RouteNamesEnum } from '../Enums';
import { take } from 'rxjs';
import { AuthService } from '../../../auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild {

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ){}

  canActivateChild( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean>{
    const IsPublic = route.data['isPublic'];
    return new Promise((res) => {
      this.authService.getAuthToken()
      .pipe(take(1))
      .subscribe(authToken => {
        const HasAuth = authToken ? true : false;

        if(IsPublic === undefined){
          res(false);
          return
        }

        if(IsPublic){
          if(HasAuth){
            this.router.navigate([`/${RouteNamesEnum.BASE}`]);
            res(false)
            return
          }
          res(true)
          return
        }

        if(!HasAuth){
          this.router.navigate([`/${RouteNamesEnum.AUTH}`]);
          res(false)
          return
        }

        res(true)
        return
      })
    })
  }

}
