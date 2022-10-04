import {
    CallHandler,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
    NestInterceptor
} from '@nestjs/common';
import {
    Observable,
    map,
    catchError
} from 'rxjs';
import { 
    GenerateDefaultResponse,
    GenerateDefaultErrorResponse,
    StatusEnum,
    DefaultResponse
} from '../../utils';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, DefaultResponse<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<DefaultResponse<T>> {
      return next.handle().pipe(map(data => {

        let responseData = data;

        if(typeof responseData === 'string'){
            responseData = {
                message: data
            }
        }

        if(responseData.constructor.name === 'Array'){
            responseData = {
                size: data.length,
                content: data
            }
        }

        const Response = GenerateDefaultResponse(
            context.getArgs()[1].statusCode,
            { ...responseData },
            StatusEnum.SUCCESS,  
        )

        return Response

      }),
      catchError((err: any) => {
          
        let errorData

        if(err instanceof HttpException){

            errorData = err.getResponse();

            if(typeof errorData === 'string'){
                errorData = {
                    message: err.getResponse()
                }
            }

            const ErrorResponse = GenerateDefaultErrorResponse(
                err.getStatus(),
                { ...errorData },  
            )

            throw ErrorResponse
        }

        errorData = err.message;

        if(typeof errorData === 'string'){
            errorData = {
                message: err.message
            }
        }

        const ErrorResponse = GenerateDefaultErrorResponse(
            HttpStatus.BAD_REQUEST,
            { ...errorData },  
        )

        throw ErrorResponse
      }));
    }
}