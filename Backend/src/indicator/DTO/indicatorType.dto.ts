import { ApiHideProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsNotEmpty,
    IsString,
    IsBoolean,
    IsNumber,
    IsOptional,
    IsObject,
    ValidateNested,
} from 'class-validator';
import { IndicatorDTO } from './indicator.dto';

export class IndicatorTypeDTO{
    
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    @IsString()
    type: string;
  
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
    @Type(() => IndicatorDTO)
    indicators : Promise<IndicatorDTO[]>;

    @ApiHideProperty()
    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => IndicatorDTO)
    __indicators__ ?: IndicatorDTO;
}