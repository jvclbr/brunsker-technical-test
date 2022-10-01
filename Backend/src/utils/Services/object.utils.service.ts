import { HttpException, HttpStatus } from "@nestjs/common";


export const CheckAccessPermissionOnObject = (objectOwner: number, req): void => {
    const CurrentUserId = req.user.id;

    if(objectOwner !== CurrentUserId){
        throw new HttpException('Permissões insuficientes', HttpStatus.FORBIDDEN) 
    }
}