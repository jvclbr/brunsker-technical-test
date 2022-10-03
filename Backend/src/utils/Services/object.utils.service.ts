import { HttpException, HttpStatus } from "@nestjs/common";
import { RolesEnum } from '../../auth/Enums';

export const CheckAccessPermissionOnObject = (objectOwner: number, req): void => {
    const CurrentUserId = req.user.id;
    const IsAdmin = req.roles.filter(userRole => userRole.id === RolesEnum.ADMIN && userRole.active ).length ? true : false;

    if(objectOwner !== CurrentUserId && !IsAdmin){
        throw new HttpException('Permissões insuficientes', HttpStatus.FORBIDDEN) 
    }
}

export const FixLazyLoadingProps = (target: Object): Object => {
    Object.keys(target).forEach(key => {
        if(key.substring(0,2) === '__' && key.includes('has')){
            delete target[key];
        }
    })

    return target
}