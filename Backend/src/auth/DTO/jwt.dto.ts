import {
    IsNotEmpty,
    IsObject,
    IsNumber,
    IsString,
    ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UserDTO } from '../../user';

export interface JWTPayloadDTO{
    user: UserDTO,
}

export class JWTLoginResponseDTO{
    
    @IsNotEmpty()
    @IsObject()
    @ValidateNested()
    @Type(() => UserDTO)
    user: UserDTO;

    @IsNotEmpty()
    @IsString()
    authToken: string;

    @IsNotEmpty()
    @IsNumber()
    expiresIn: number;

}