import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {
  Observable,
  BehaviorSubject,
  ReplaySubject,
  take
} from 'rxjs';
import {
  BaseService,
  APIRouteNamesEnum,
  RouteNamesEnum,
  APIResponseDTO,
  ToastService,
  ToastEnum,
  HttpHeadersEnum
} from '../../@core';
import { SignInDTO, SignInResponseDTO } from '../DTO';
import { AuthCookieEnum } from '../Enums';
import { UserDTO } from '../../user';
import { UserService } from '../../user/Service/user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService<SignInDTO>{
  protected readonly apiPath:string = APIRouteNamesEnum.AUTH;
  protected readonly mainPath:string = RouteNamesEnum.AUTH;
  private authToken: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(
    protected override readonly httpClient: HttpClient,
    protected override readonly router: Router,
    private readonly cookieService: CookieService,
    private readonly toastService: ToastService,
    private readonly userService: UserService,
  ){
    super(
      httpClient,
      router
    );

    this.setInitialAuthToken();
  }

  public signIn(credentials: SignInDTO): Observable<APIResponseDTO<SignInResponseDTO>>{
    const APIResponse = new ReplaySubject<APIResponseDTO<SignInResponseDTO>>();
    this.httpClient.post<APIResponseDTO<SignInResponseDTO>>(`${this.API_URL}/${this.apiPath}/login`, credentials)
    .pipe(take(1))
    .subscribe({
      next: (res) => {
        if(res){
          this.setAuthToken(res.data.authToken, res.data.expiresIn);
          this.setUser(res.data.user);
          this.router.navigate([`/${RouteNamesEnum.REAL_ESTATE}`]);
          APIResponse.next(res);
          this.toastService.showToast({
            data: {
              content: `Bem Vindo ao sistema ${res.data.user.name}`
            },
            type: ToastEnum.SUCCESS
          })
        }
      },
      error: (err) => {
        APIResponse.error(err);
      },
    })

    return APIResponse.asObservable();
  }

  public refresh(showToast: boolean = true): Observable<APIResponseDTO<SignInResponseDTO>>{
    const APIResponse = new ReplaySubject<APIResponseDTO<SignInResponseDTO>>();
    this.httpClient.get<APIResponseDTO<SignInResponseDTO>>(`${this.API_URL}/${this.apiPath}/refresh`,{
      headers: {
        Authorization: `Bearer ${this.getAuthTokenFromCookie()}`,
        [HttpHeadersEnum.SKIP_AUTH_INTERCEPTOR] : 'true'
      }
    })
    .pipe(take(1))
    .subscribe({
      next: (res) => {
        if(res){
          this.setAuthToken(res.data.authToken, res.data.expiresIn);
          this.setUser(res.data.user);
          APIResponse.next(res);
          if(showToast){
            this.toastService.showToast({
              data: {
                content: `Bem Vindo ao sistema ${res.data.user.name}`
              },
              type: ToastEnum.SUCCESS
            })
          }
        }
      },
      error: (err) => {
        APIResponse.error(err);
        this.logout();
      },
    })

    return APIResponse.asObservable();
  }

  public signUp(sigInData: UserDTO): Observable<APIResponseDTO<UserDTO>>{
    return this.userService.create(sigInData)
  }

  public logout(): void{
    this.cookieService.delete(AuthCookieEnum.AUTH_TOKEN, '/');
    this.cookieService.delete(AuthCookieEnum.AUTH_TOKEN_EXPIRES_IN, '/');
    this.userService.clearLoggedUserFromStorage();
    this.router.navigate([`/${RouteNamesEnum.AUTH}`]);
    this.authToken.next('');
  }

  private setUser(loggedUser: UserDTO): void{
    this.userService.setLoggedUser(loggedUser);
  }

  private setAuthToken(authToken: string, expiresIn?: number): void {
    const ExpirationDate = new Date().getTime() + ((expiresIn || 0) * 1000);
    this.cookieService.set(AuthCookieEnum.AUTH_TOKEN, authToken, { expires: new Date(ExpirationDate), path: '/' });
    this.cookieService.set(AuthCookieEnum.AUTH_TOKEN_EXPIRES_IN, `${ExpirationDate}`, { expires: new Date(ExpirationDate), path: '/' });
    this.authToken.next(authToken);
  }

  public getAuthToken(): Observable<string>{
    return this.authToken.asObservable();
  }

  private getAuthTokenFromCookie(): string{
    const AuthToken = this.cookieService.get(AuthCookieEnum.AUTH_TOKEN);
    return AuthToken
  }

  private setInitialAuthToken(): void{
    const AuthToken = this.getAuthTokenFromCookie();
    if(AuthToken){
      this.authToken.next(AuthToken);
    }
  }

  public checkIfAuthTokenShouldRefresh(): boolean{
    const HasToken = this.cookieService.check(AuthCookieEnum.AUTH_TOKEN);
    const HasExpireDate = this.cookieService.check(AuthCookieEnum.AUTH_TOKEN_EXPIRES_IN);

    if(HasToken && HasExpireDate){
      const ExpireDate = Number(this.cookieService.get(AuthCookieEnum.AUTH_TOKEN_EXPIRES_IN));

      const TimeDifference = ExpireDate - new Date().getTime();
      const TimeDifferenceInMinutes = TimeDifference/60000;
      const RefreshTargetInMinutes = 15;

      if(TimeDifferenceInMinutes <= 0){
        this.logout();
        return false
      }
      else if(TimeDifferenceInMinutes <= RefreshTargetInMinutes){
        return true
      }

      return false
    }

    return false
  }
}
