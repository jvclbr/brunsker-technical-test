import { Injectable, CanActivate, ExecutionContext, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../Decorators';
import { RolesEnum } from '../Enums';
import { GenerateDefaultErrorResponse } from '../../utils'
import { RoleDTO } from '../../indicator';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<RolesEnum[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredRoles) {
            return true;
        }

        const CurrentRoles = context.switchToHttp().getRequest().roles as RoleDTO[];

        const HasRole =  requiredRoles.some((role) => {

            const MatchedRoles = CurrentRoles.filter(userRole => userRole.id === role && userRole.active );

            if(!MatchedRoles.length){
                return false
            }

            return true
        });

        if(!HasRole){
            throw GenerateDefaultErrorResponse(HttpStatus.FORBIDDEN, { message: 'Permissões insuficientes'})
        }

        return HasRole
    }
}