import { ApiHideProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsNotEmpty,
    IsString,
    IsBoolean,
    IsNumber,
    IsObject,
    ValidateNested,
    IsOptional,
    IsArray
} from 'class-validator';
import { IndicatorTypeDTO } from './indicatorType.dto'

export class IndicatorDTO{
    
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    @IsString()
    value: string;
  
    @IsNotEmpty()
    @IsString()
    description: string;
  
    @IsNotEmpty()
    @IsBoolean()
    active: boolean;

    @ApiHideProperty()
    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => IndicatorTypeDTO)
    indicatorType ?: Promise<IndicatorTypeDTO>;

    @ApiHideProperty()
    @IsOptional()
    @IsArray()
    @ValidateNested()
    @Type(() => IndicatorTypeDTO)
    __indicatorType__ ?: IndicatorTypeDTO[];
}

export class RoleDTO extends IndicatorDTO {}