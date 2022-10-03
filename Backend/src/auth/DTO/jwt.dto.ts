import {
    IsNotEmpty,
    IsObject,
    IsNumber,
    IsString,
    IsDefined,
    IsNotEmptyObject,
    ValidateNested,
    IsArray
} from 'class-validator';
import { Type } from 'class-transformer';
import { UserDTO } from '../../user';
import { IndicatorDTO } from '../../indicator';

export interface JWTPayloadDTO{
    user: UserDTO,
    roles: IndicatorDTO[]
}

export class JWTLoginResponseDTO{
    
    @IsNotEmpty()
    @IsObject()
    @ValidateNested()
    @Type(() => UserDTO)
    user: UserDTO;

    @IsNotEmpty()
    @IsArray()
    @ValidateNested()
    @Type(() => IndicatorDTO)
    roles: IndicatorDTO[];

    @IsNotEmpty()
    @IsString()
    authToken: string;

    @IsNotEmpty()
    @IsNumber()
    expiresIn: number;

}