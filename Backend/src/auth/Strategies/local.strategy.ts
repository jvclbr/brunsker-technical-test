import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../Service';
import { UserDTO } from '../../user';
import { GenerateDefaultErrorResponse } from '../../utils';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

  constructor(private authService: AuthService) {
    super({
      usernameField: 'email'
    });
  }

  async validate(email: string, password: string): Promise<UserDTO> {
    try{
      const FoundedUser = await this.authService.validateUser({ email, password });
      return FoundedUser
    }
    catch(err: any){

      const ErrorData = typeof err.getResponse() === 'string' ? { message: err.getResponse() } : err.getResponse();

      const ErrorResponse = GenerateDefaultErrorResponse(
        err.getStatus(),
        { ...ErrorData },  
      )

      throw ErrorResponse
    }
  }
}