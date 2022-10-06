import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { MenuItemDTO } from '../DTO'
import { RouteNamesEnum } from '../../base';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private menuItens: ReplaySubject<MenuItemDTO[]> = new ReplaySubject<MenuItemDTO[]>();
  private logoutItem: ReplaySubject<MenuItemDTO> = new ReplaySubject<MenuItemDTO>();

  constructor() {
    this.loadMenuItens();
    this.loadLogoutItem();
  }

  private loadMenuItens(){
    const MenuItens:MenuItemDTO[] = [
      {
        label: 'Imóveis',
        icon: 'business',
        tooltip: 'Imóveis',
        route: `${RouteNamesEnum.REAL_ESTATE}`,
        module: 'real-estate'
      }
    ];

    this.setMenuItens(MenuItens);
  }

  private loadLogoutItem(){
    const LogoutItem:MenuItemDTO = {
      label: 'Sair',
      icon: 'logout',
      tooltip: 'Sair'
    }

    this.setLogoutItem(LogoutItem);
  }

  private setMenuItens(menuList: MenuItemDTO[]): void{
    this.menuItens.next(menuList);
  }

  public getMenuItens():Observable<MenuItemDTO[]>{
    return this.menuItens.asObservable()
  }

  private setLogoutItem(logoutIcon: MenuItemDTO): void{
    this.logoutItem.next(logoutIcon);
  }

  public getLogoutItem():Observable<MenuItemDTO>{
    return this.logoutItem.asObservable()
  }

}
