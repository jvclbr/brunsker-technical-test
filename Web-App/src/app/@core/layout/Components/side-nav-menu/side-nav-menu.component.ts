import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter
} from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { MenuItemDTO } from '../../DTO';
import { MenuService } from '../../Service';

@Component({
  selector: 'app-side-nav-menu',
  templateUrl: './side-nav-menu.component.html',
  styleUrls: ['./side-nav-menu.component.scss']
})
export class SideNavMenuComponent implements OnInit, OnDestroy {

  @Output() public handleRedirect: EventEmitter<MenuItemDTO> = new EventEmitter<MenuItemDTO>()
  @Output() public handleLogout: EventEmitter<void> = new EventEmitter<void>()

  private subscriptions = new Subscription();
  public $menuItens!: Observable<MenuItemDTO[]>;
  public $logoutItem!: Observable<MenuItemDTO>;
  public activeModule!: string;

  constructor(
    private readonly menuService: MenuService,
    private readonly router: Router
  ) {
    this.$menuItens = this.menuService.getMenuItens();
    this.$logoutItem = this.menuService.getLogoutItem();
    this.activeModule = this.getActiveModuleFromRoute(this.router.url);
  }

  ngOnInit(): void {
    this.initSubscriptions();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private initSubscriptions(): void{
    this.subscriptions.add(this.RouterSubscription());
  }

  private RouterSubscription(): Subscription {
    return this.router.events.subscribe(res => {
      if(res instanceof NavigationStart){
        const Module = this.getActiveModuleFromRoute(res.url);
        this.activeModule = Module;
      }
    })
  }

  public redirect(target:MenuItemDTO ): void{

    this.handleRedirect.emit(target);

    if(target.module){
      this.activeModule = target.module;
    }
  }

  private getActiveModuleFromRoute(currentRoute: string): string{
    const Module = currentRoute.split('/')[1];
    return Module
  }

  public logout(): void{
    this.handleLogout.emit();
  }

}
