import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  BaseService,
  APIRouteNamesEnum,
  APIResponseDTO
} from '../../@core';
import {
  Observable,
  ReplaySubject,
  take
} from 'rxjs';
import { UserDTO } from '../DTO';
import { UserStorageEnum } from '../Enums';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<UserDTO>{

  protected readonly apiPath:string = APIRouteNamesEnum.USER;
  protected readonly mainPath:string = '';

  private loggedUser: ReplaySubject<UserDTO> = new ReplaySubject<UserDTO>();

  constructor(
    protected override readonly httpClient: HttpClient,
    protected override readonly router: Router
  ) {
    super(
      httpClient,
      router
    )

    const LoggedUser = this.getLoggedUserFromStorage();
    if(LoggedUser){
      this.setLoggedUser(LoggedUser);
    }
  }

  public override create(newUser: UserDTO): Observable<APIResponseDTO<UserDTO>>{
    const APIResponse = new ReplaySubject<APIResponseDTO<UserDTO>>();

    this.httpClient.post<APIResponseDTO<UserDTO>>(`${this.API_URL}/${this.apiPath}`, newUser)
    .pipe(take(1))
    .subscribe({
      next: (res) => {
        if(res){
          APIResponse.next(res);
        }
      },
      error: (err) => {
        APIResponse.error(err);
      },
    });

    return APIResponse.asObservable();
  }

  public getLoggedUser(): Observable<UserDTO>{
    return this.loggedUser.asObservable();
  }

  public setLoggedUser(newUser: UserDTO){
    this.loggedUser.next(newUser);
    this.setLoggedUserOnStorage(newUser);
  }

  private setLoggedUserOnStorage(newUser: UserDTO){
    localStorage.setItem(UserStorageEnum.LOGGED_USER,JSON.stringify(newUser));
  }

  private getLoggedUserFromStorage(): UserDTO | null{
    const RawLoggedUser = localStorage.getItem(UserStorageEnum.LOGGED_USER);

    if(RawLoggedUser){
      const LoggedUser = JSON.parse(RawLoggedUser) as UserDTO;
      return LoggedUser
    }

    return null
  }

  public clearLoggedUserFromStorage(){
    localStorage.removeItem(UserStorageEnum.LOGGED_USER);
    this.loggedUser = new ReplaySubject<UserDTO>();
  }
}
