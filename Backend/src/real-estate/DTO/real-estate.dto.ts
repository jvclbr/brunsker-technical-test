import { ApiHideProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsNotEmpty,
    IsString,
    IsBoolean,
    IsNumber,
    IsOptional,
    ValidateNested,
    IsNumberString,
    IsObject,
    IsDate
} from 'class-validator';
import { IndicatorDTO } from '../../indicator';
import { UserDTO } from '../../user';
import { AddressDTO, CreateAddressDTO, UpdateAddressDTO } from '../../address';

export class RealEstateDTO{
    
    @IsNotEmpty()
    @IsNumber()
    id: number;
  
    @IsNotEmpty()
    @IsString()
    nome: string;
  
    @IsNotEmpty()
    @IsNumber()
    valor: number;
  
    @IsNotEmpty()
    @IsNumber()
    condominio: number;
  
    @IsNotEmpty()
    @IsNumber()
    quartos: number;
  
    @IsNotEmpty()
    @IsNumber()
    banheiros: number;

    @IsNotEmpty()
    @IsBoolean()
    mobiliado: boolean;

    @IsNotEmpty()
    @IsNumber()
    area: number;

    @IsNotEmpty()
    @IsBoolean()
    venda: boolean;

    @IsNotEmpty()
    @IsBoolean()
    aluguel: boolean;

    @IsNotEmpty()
    @IsDate()
    dataAnuncio: Date;

    @IsNotEmpty()
    @IsBoolean()
    active: boolean;
  
    @IsNotEmpty()
    @IsObject()
    @ValidateNested()
    @Type(() => IndicatorDTO)
    type: IndicatorDTO;

    @IsNotEmpty()
    @IsObject()
    @ValidateNested()
    @Type(() => AddressDTO)
    address: AddressDTO;

    @ApiHideProperty()
    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => UserDTO)
    user: Promise<UserDTO>;

    @ApiHideProperty()
    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => UserDTO)
    __user__?: UserDTO;

}

export class CreateRealEstateDTO{
  
    @IsNotEmpty()
    @IsString()
    nome: string;
  
    @IsNotEmpty()
    @IsNumber()
    valor: number;
  
    @IsNotEmpty()
    @IsNumber()
    condominio: number;
  
    @IsNotEmpty()
    @IsNumber()
    quartos: number;
  
    @IsNotEmpty()
    @IsNumber()
    banheiros: number;

    @IsNotEmpty()
    @IsBoolean()
    mobiliado: boolean;

    @IsNotEmpty()
    @IsNumber()
    area: number;

    @IsNotEmpty()
    @IsBoolean()
    venda: boolean;

    @IsNotEmpty()
    @IsBoolean()
    aluguel: boolean;

    @IsNotEmpty()
    @IsBoolean()
    active: boolean;
  
    @IsNotEmpty()
    @IsObject()
    @ValidateNested()
    @Type(() => IndicatorDTO)
    type: IndicatorDTO;

    @IsNotEmpty()
    @IsObject()
    @ValidateNested()
    @Type(() => CreateAddressDTO)
    address: CreateAddressDTO;

}

export class UpdateRealEstateDTO{
  
    @IsOptional()
    @IsString()
    nome: string;
  
    @IsOptional()
    @IsNumber()
    valor: number;
  
    @IsOptional()
    @IsNumber()
    condominio: number;
  
    @IsOptional()
    @IsNumber()
    quartos: number;
  
    @IsOptional()
    @IsNumber()
    banheiros: number;

    @IsOptional()
    @IsBoolean()
    mobiliado: boolean;

    @IsOptional()
    @IsNumber()
    area: number;

    @IsOptional()
    @IsBoolean()
    venda: boolean;

    @IsOptional()
    @IsBoolean()
    aluguel: boolean;

    @IsOptional()
    @IsBoolean()
    active: boolean;
  
    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => IndicatorDTO)
    type: IndicatorDTO;

    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => UpdateAddressDTO)
    address: UpdateAddressDTO;
}

export class RealEstateParamsDTO{
    
    @IsNotEmpty()
    @IsNumberString()
    id: number;
}