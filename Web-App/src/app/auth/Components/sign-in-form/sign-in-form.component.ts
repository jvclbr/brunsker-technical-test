import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import { FormBuilder, FormGroup } from '@ngneat/reactive-forms';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { take, Subscription, Observable } from 'rxjs';
import {
  PlataformService,
  PlataformEnum,
  RouteNamesEnum,
  PlataformTypes
} from '../../../@core'
import { AuthRouteNamesEnum } from '../../Routes/auth-route-names.enum';
import { AuthService } from '../../Service';
import { SignInDTO } from '../../DTO';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss']
})
export class SignInFormComponent implements OnInit, OnDestroy {

  private subscriptions = new Subscription();
  public signInForm!: FormGroup<SignInDTO>;
  public $plataform!:Observable<PlataformTypes>;
  public PlataformEnum = PlataformEnum;
  public hidePassword: boolean = true;

  constructor(
    private readonly authService: AuthService,
    private readonly formBuilder: FormBuilder,
    private readonly plataformService: PlataformService,
    private readonly router: Router
  ) {
    this.$plataform = this.plataformService.getPlataform();
  }

  ngOnInit(): void {
    this.initForm();
    this.initSubscriptions();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private initSubscriptions(){
  }

  private initForm(){
    this.signInForm = this.formBuilder.group<SignInDTO>({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })

  }

  public handleSignUp(){
    this.router.navigate([`/${RouteNamesEnum.AUTH}/${AuthRouteNamesEnum.SIGN_UP}`]);
  }

  public handleSignIn(){
    if(this.signInForm.valid){
      const Credentials = this.signInForm.value;
      this.signIn(Credentials)
    }
  }

  private signIn(credentials: SignInDTO): void{
    this.authService.signIn(credentials)
    .pipe(take(1))
    .subscribe({
      error: () => {
        this.signInForm.reset();
      },
    });
  }

}
