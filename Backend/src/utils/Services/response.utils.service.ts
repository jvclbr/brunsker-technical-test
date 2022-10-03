import { DefaultResponse, ResponseStatus } from '../DTO';
import { StatusEnum } from '../Enums';
import { HttpException } from '@nestjs/common';

export const GenerateDefaultResponse = (statusCode: number, data: any, message: ResponseStatus, time: Date = new Date()): DefaultResponse<any> => {

    const Response: DefaultResponse<any> = {
        statusCode: statusCode,
        message: message,
        data: { ...data },
        time
    } ;

    return Response
}

export const GenerateDefaultErrorResponse = (statusCode: number, data: any, message: ResponseStatus = StatusEnum.ERROR , time: Date = new Date()): HttpException => {

    const ErrorResponse = GenerateDefaultResponse(
        statusCode,
        data,
        message,
        time
    );

    return new HttpException(ErrorResponse, statusCode)
}