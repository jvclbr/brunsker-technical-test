import { Exclude } from 'class-transformer';
import {
    IsEmail,
    IsNotEmpty,
    IsString,
    IsBoolean,
    IsNumber,
    IsOptional,
    IsNumberString,
} from 'class-validator';

export class UserDTO{
    
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    @IsString()
    name: string;
  
    @IsNotEmpty()
    @IsEmail()
    email: string;
  
    @Exclude()
    password: string;
  
    @IsNotEmpty()
    @IsBoolean()
    active: boolean;
}

export class CreateUserDTO{
    
    @IsNotEmpty()
    @IsString()
    name: string;
  
    @IsNotEmpty()
    @IsEmail()
    email: string;
  
    @IsNotEmpty()
    @IsString()
    password: string;
}

export class UpdateUserDTO{

    @IsOptional()
    @IsString()
    name: string;
  
    @IsOptional()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    password: string;
}

export class UserParamsDTO{
    
    @IsNotEmpty()
    @IsNumberString()
    id: number;
}