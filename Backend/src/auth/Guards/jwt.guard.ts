import { HttpStatus, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GenerateDefaultErrorResponse } from '../../utils';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    
    handleRequest(err, jwtPayload, info, context) {
        const { user, roles } = jwtPayload
        const req = context.switchToHttp().getRequest();
        req.roles = roles;

        if (err || !user) {
            throw err || GenerateDefaultErrorResponse(HttpStatus.UNAUTHORIZED, { message: info.message }) 
        }

        return user;
    }
}


