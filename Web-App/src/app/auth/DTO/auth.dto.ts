import { IndicatorDTO } from '../../@core'
import { UserDTO } from '../../user';

export interface SignInDTO {
  email: string;
  password: string;
}

export interface SignUpDTO extends UserDTO {
  passwordConfirm: string;
}

export interface SignInResponseDTO {
  user: UserDTO;
  roles: IndicatorDTO[];
  authToken: string;
  expiresIn: number;
}

