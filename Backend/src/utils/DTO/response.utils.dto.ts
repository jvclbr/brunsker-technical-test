import { ActionsEnum, StatusEnum } from '../Enums';
import {
    IsNotEmpty,
    IsObject,
    IsNumber,
    IsString,
    IsDate,
    ValidateNested,
    IsOptional,
} from 'class-validator';

export class DefaultResponse<T> {

    @IsNotEmpty()
    @IsNumber()
    statusCode: number;

    @IsNotEmpty()
    @IsString()
    message: ResponseStatus;

    @IsNotEmpty()
    @IsObject()
    @ValidateNested()
    data: T;

    @IsNotEmpty()
    @IsDate()
    time: Date;
}

export class FeedbackResponse{

    @IsNotEmpty()
    @IsNumber()
    action: ResponseActions;

    @IsNotEmpty()
    @IsString()
    status: ResponseStatus;

    @IsNotEmpty()
    @IsString()
    message: string;

    @IsOptional()
    @IsNumber()
    count ?: number;
}

export declare type ResponseActions = ActionsEnum.CREATE | ActionsEnum.DELETE | ActionsEnum.LIST | ActionsEnum.UPDATE | ActionsEnum.DEACTIVATE | ActionsEnum.ACTIVATE;

export declare type ResponseStatus = StatusEnum.ERROR | StatusEnum.SUCCESS;

