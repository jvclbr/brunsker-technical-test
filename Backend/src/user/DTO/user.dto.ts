import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
import {
    IsEmail,
    IsNotEmpty,
    IsString,
    IsBoolean,
    IsNumber,
    IsOptional,
    IsNumberString,
    ValidateNested,
    IsArray,
} from 'class-validator';
import { RoleDTO } from '../../indicator';
import { RealEstateDTO } from '../../real-estate';
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

    @ApiHideProperty()
    @IsOptional()
    @IsArray()
    @ValidateNested()
    @Type(() => RoleDTO)
    roles : Promise<RoleDTO[]>;

    @ApiHideProperty()
    @IsOptional()
    @IsArray()
    @ValidateNested()
    @Type(() => RoleDTO)
    __roles__ ?: RoleDTO[];

    @ApiHideProperty()
    @IsOptional()
    @IsArray()
    @ValidateNested()
    @Type(() => RealEstateDTO)
    favList : Promise<RealEstateDTO[]>;

    @ApiHideProperty()
    @IsOptional()
    @IsArray()
    @ValidateNested()
    @Type(() => RealEstateDTO)
    __favList__ ?: RealEstateDTO[];
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