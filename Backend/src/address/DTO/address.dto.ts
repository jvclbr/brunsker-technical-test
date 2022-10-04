import { Type } from 'class-transformer';
import {
    IsNotEmpty,
    IsString,
    IsBoolean,
    IsNumber,
    IsOptional,
    ValidateNested,
    IsNumberString,
    Validate,
    IsObject
} from 'class-validator';
import { IsValidCEP } from '../../utils';
import { IndicatorDTO } from '../../indicator';

export class AddressDTO{
    
    @IsNotEmpty()
    @IsNumber()
    id: number;
  
    @IsNotEmpty()
    @IsString()
    pais: string;
  
    @IsNotEmpty()
    @IsString()
    logradouro: string;
  
    @IsNotEmpty()
    @IsString()
    numero: string;
  
    @IsOptional()
    @IsString()
    complemento: string;
  
    @IsNotEmpty()
    @IsString()
    bairro: string;
  
    @IsNotEmpty()
    @IsString()
    @Validate(IsValidCEP)
    cep: string;

    @IsNotEmpty()
    @IsBoolean()
    active: boolean;
  
    @IsNotEmpty()
    @IsObject()
    @ValidateNested()
    @Type(() => IndicatorDTO)
    uf: IndicatorDTO;

    @IsNotEmpty()
    @IsObject()
    @ValidateNested()
    @Type(() => IndicatorDTO)
    localidade: IndicatorDTO;
}

export class CreateAddressDTO{
  
    @IsNotEmpty()
    @IsString()
    logradouro: string;
  
    @IsNotEmpty()
    @IsString()
    numero: string;
  
    @IsOptional()
    @IsString()
    complemento: string;
  
    @IsNotEmpty()
    @IsString()
    bairro: string;
  
    @IsNotEmpty()
    @IsString()
    @Validate(IsValidCEP)
    cep: string;

    @IsNotEmpty()
    @IsBoolean()
    active: boolean;
  
    @IsNotEmpty()
    @IsObject()
    @ValidateNested()
    @Type(() => IndicatorDTO)
    uf: IndicatorDTO;

    @IsNotEmpty()
    @IsObject()
    @ValidateNested()
    @Type(() => IndicatorDTO)
    localidade: IndicatorDTO;
}

export class UpdateAddressDTO{
  
    @IsOptional()
    @IsString()
    logradouro: string;
  
    @IsOptional()
    @IsString()
    numero: string;
  
    @IsOptional()
    @IsString()
    complemento: string;
  
    @IsOptional()
    @IsString()
    bairro: string;
  
    @IsOptional()
    @IsString()
    @Validate(IsValidCEP)
    cep: string;

    @IsOptional()
    @IsBoolean()
    active: boolean;
  
    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => IndicatorDTO)
    uf: IndicatorDTO;

    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => IndicatorDTO)
    localidade: IndicatorDTO;
}

export class AddressParamsDTO{
    
    @IsNotEmpty()
    @IsNumberString()
    id: number;
}

export class SearchAddressParam {
    @IsNotEmpty()
    @IsString()
    @Validate(IsValidCEP)
    cep: string;
}

export class AddressTypeAheadQuery {
    @IsOptional()
    @IsString()
    userInput?: string;
}