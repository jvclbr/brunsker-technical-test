import {
    Controller,
    Post,
    Get,
    Put,
    Body,
    Param,
    Request,
    HttpException,
    HttpStatus,
    UseGuards
} from '@nestjs/common';
import { UserService } from '../Service';
import {
    UserDTO,
    CreateUserDTO,
    UpdateUserDTO,
    UserParamsDTO
} from '../DTO';
import { FeedbackResponse } from '../../utils';
import {
    JwtAuthGuard,
    RolesGuard
} from '../../auth/Guards';
import { Roles } from '../../auth/Decorators';
import { RolesEnum } from '../../auth/Enums';
import {
    ApiBearerAuth,
    ApiTags
} from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {

    constructor( private readonly userService: UserService ){}

    @Post()
    async createNewUser(@Body() userToCreate: CreateUserDTO): Promise<UserDTO>{
        try{
            const Response = this.userService.createNewUser(userToCreate);
            return Response
        }
        catch(err){
            throw err
        }
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN)
    @Get()
    async getAllUsers(): Promise<UserDTO[]>{
        try{
            const Response = await this.userService.getAllUsers();
            return Response
        }
        catch(err){
            throw err
        }
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN, RolesEnum.CLIENT)
    @Get(':id')
    async getUserById(@Param() userParams: UserParamsDTO, @Request() req): Promise<UserDTO>{
        try{
            const Response = await this.userService.getUserByIdProtected(userParams.id, req);
            return Response
        }
        catch(err){
            throw err
        }
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN, RolesEnum.CLIENT)
    @Put(':id')
    async updateUserById(@Param() userParams: UserParamsDTO, @Body() userToUpdate: UpdateUserDTO, @Request() req): Promise<FeedbackResponse>{
        try{
            if(!Object.keys(userToUpdate).length){
                throw new HttpException('Nada para atualizar', HttpStatus.BAD_REQUEST)
            }
            const Response = await this.userService.updateUserByid(userParams.id, userToUpdate, req);
            return Response
        }
        catch(err){
            throw err
        }
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN)
    @Put('deactivate/:id')
    async deactivateUserById(@Param() userParams: UserParamsDTO, @Request() req): Promise<FeedbackResponse>{
        try{
            const Response = await this.userService.deactivateUserById(userParams.id, req);
            return Response
        }
        catch(err){
            throw err
        }
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN)
    @Put('activate/:id')
    async activateUserById(@Param() userParams: UserParamsDTO, @Request() req): Promise<FeedbackResponse>{
        try{
            const Response = await this.userService.activateUserById(userParams.id, req);
            return Response
        }
        catch(err){
            throw err
        }
    }

}
