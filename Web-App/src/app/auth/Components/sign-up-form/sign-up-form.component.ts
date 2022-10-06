import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import { FormBuilder, FormGroup } from '@ngneat/reactive-forms';
import { Router } from '@angular/router';
import {
  AbstractControl,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { Observable, Subscription, take } from 'rxjs';
import {
  PlataformService,
  PlataformEnum,
  validateSameString,
  RouteNamesEnum,
  PlataformTypes
} from '../../../@core'
import { AuthService } from '../../Service';
import { SignUpDTO, SignInDTO } from '../../DTO';
import { AuthRouteNamesEnum } from '../../Routes/auth-route-names.enum';
import { UserDTO } from '../../../user';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss']
})
export class SignUpFormComponent implements OnInit {

  private subscriptions = new Subscription();
  public signUpForm!: FormGroup<SignUpDTO>;
  public $plataform!:Observable<PlataformTypes>;
  public PlataformEnum = PlataformEnum;
  public hidePassword: boolean = true;
  public hidePasswordConfirm: boolean = true;

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
    this.subscriptions.unsubscribe()
  }

  private initSubscriptions(){
  }

  private initForm(){
    this.signUpForm = this.formBuilder.group<SignUpDTO>({
      id: [0],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordConfirm: ['', [Validators.required, Validators.minLength(8), this.validarSenha]],
      active:[true]
    })
  }

  private validarSenha = (control: AbstractControl): ValidationErrors | null => {

    const CurrentPassword = this.signUpForm?.controls.password.value ?? ''
    if (!validateSameString(control.value, CurrentPassword)) {
      const Response: ValidationErrors = {
        confirm: true,
        error: true
      }
      return Response;
    }

    return null

  };

  public checkPassword(){
    const IsEqual = this.validarSenha(this.signUpForm.controls.passwordConfirm) ? false : true;

    if(IsEqual){
      this.signUpForm.controls.passwordConfirm.removeError('confirm');
      this.signUpForm.controls.passwordConfirm.removeError('error');
      return
    }

    const MustShowError = this.signUpForm.controls.passwordConfirm.value.length >= 8 ? true : false;

    if(MustShowError){
      this.signUpForm.controls.passwordConfirm.setErrors({
        confirm: true,
        error: true
      })
    }

  }

  public handleSignIn(){
    this.router.navigate([`/${RouteNamesEnum.AUTH}/${AuthRouteNamesEnum.SIGN_IN}`]);
  }

  public handleSignUp(){

    if(this.signUpForm.valid){
      const FormData:Omit<SignUpDTO, 'passwordConfirm'> = this.signUpForm.value;

      const SignUpData: UserDTO = {
        ...FormData
      };

      this.authService.signUp(SignUpData)
      .pipe(take(1))
      .subscribe(res => {
        if(res){
          const Credentials: SignInDTO = {
            email: FormData.email,
            password: FormData.password
          }
          this.authService.signIn(Credentials);
        }
      })
    }
  }



}
