import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { Observable, Subscription, take } from 'rxjs';
import { SideNavModes } from '../../../base';
import { UserDTO, UserService } from '../../../../user';
import { AuthService } from '../../../../auth';
import { PlataformEnum } from '../../Enums';
import { PlataformService } from '../../Service';
import { PlataformTypes } from '../../Type';
import { MenuItemDTO } from '../../DTO';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit, OnDestroy {

  private subscriptions = new Subscription();
  public $user!: Observable<UserDTO>;
  public $plataform!:Observable<PlataformTypes>;
  public PlataformEnum = PlataformEnum;
  public openSideNav!: boolean;
  public sideNavMode: MatDrawerMode = SideNavModes.SIDE;


  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly plataformService: PlataformService,
    private readonly router: Router
  ) {
    this.$user = this.userService.getLoggedUser()
    this.$plataform = this.plataformService.getPlataform();
  }

  ngOnInit(): void {
    this.initSubscriptions();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private initSubscriptions(){
    this.authTokenSubscription();
    this.subscriptions.add(this.plataformSubscription())
  }

  private authTokenSubscription(): Subscription {
    return this.authService.getAuthToken()
    .pipe(take(1))
    .subscribe(authToken => {
      if(authToken){
        this.authService.refresh()
      }
    })
  }

  private plataformSubscription(): Subscription {
    return this.$plataform.subscribe(plataform => {
      if(plataform === PlataformEnum.MOBILE){
        this.setSideNavOpenState(false);
        this.sideNavMode = SideNavModes.OVER;
      }
      else{
        this.setSideNavOpenState(true);
        this.sideNavMode = SideNavModes.SIDE;
      }
    })
  }

  public setSideNavOpenState(isOpen: boolean){
    this.openSideNav = isOpen;
  }

  public handleLogout(){
    this.authService.logout();
  }

  public handleRedirect(target: MenuItemDTO){
    if(target.route){
      this.router.navigate([target.route]);
    }
  }
}
