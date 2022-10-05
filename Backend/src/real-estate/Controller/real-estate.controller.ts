import {
    Controller,
    Get,
    Param,
    Post,
    Put,
    UseGuards,
    Request,
    Body,
    HttpStatus,
    HttpException,
    Delete
} from '@nestjs/common';
import { RealEstateService } from '../Service'
import {
    RealEstateDTO,
    CreateRealEstateDTO,
    UpdateRealEstateDTO,
    RealEstateParamsDTO
} from '../DTO';
import {
    JwtAuthGuard,
    RolesGuard
} from '../../auth/Guards';
import { Roles } from '../../auth/Decorators';
import { RolesEnum } from '../../auth/Enums';
import { FeedbackResponse } from '../../utils';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Real Estate')
@Controller('real-estate')
export class RealEstateController {
    constructor(
        private readonly realEstateService: RealEstateService
    ){}

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN, RolesEnum.CLIENT)
    @Post()
    async createNewRealEstate(@Body() newRealEstate: CreateRealEstateDTO, @Request() req): Promise<RealEstateDTO>{
        try{
            const Response = await this.realEstateService.createNewRealEstate(newRealEstate, req.user);
            return Response
        }
        catch(err){
            throw err
        }
    }

    @Get()
    async listAllRealEstates(): Promise<RealEstateDTO[]>{
        try{
            const Response = await this.realEstateService.getAllRealEstates();
            return Response
        }
        catch(err){
            throw err
        }
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN, RolesEnum.CLIENT)
    @Get('/user')
    async listAllUserRealEstates(@Request() req: any): Promise<RealEstateDTO[]>{
        try{
            const Response = await this.realEstateService.getAllUserRealEstates(req.user);
            return Response
        }
        catch(err){
            throw err
        }
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN, RolesEnum.CLIENT)
    @Get('/user/fav')
    async listAllUserFavRealEstates(@Request() req: any): Promise<RealEstateDTO[]>{
        try{
            const Response = await this.realEstateService.getAllUserFavRealEstates(req.user, req);
            return Response
        }
        catch(err){
            throw err
        }
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN, RolesEnum.CLIENT)
    @Put('/user/fav/:id')
    async addRealEstateToUserFav(@Param() RealEstateParams: RealEstateParamsDTO, @Request() req: any): Promise<RealEstateDTO[]>{
        try{
            const Response = await this.realEstateService.addRealEstateToUserFav(RealEstateParams.id, req);
            return Response
        }
        catch(err){
            throw err
        }
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN, RolesEnum.CLIENT)
    @Delete('/user/fav/:id')
    async removeRealEstateFromUserFav(@Param() RealEstateParams: RealEstateParamsDTO, @Request() req: any): Promise<RealEstateDTO[]>{
        try{
            const Response = await this.realEstateService.removeRealEstateFromUserFav(RealEstateParams.id, req);
            return Response
        }
        catch(err){
            throw err
        }
    }

    @Get(':id')
    async listRealEstateById(@Param() RealEstateParams: RealEstateParamsDTO): Promise<RealEstateDTO>{
        try{
            const Response = await this.realEstateService.getRealEstateById(RealEstateParams.id);
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
    async updateRealEstateById(@Param() RealEstateParams: RealEstateParamsDTO, @Body() RealEstateToUpdate: UpdateRealEstateDTO, @Request() req: any): Promise<FeedbackResponse>{
        try{
            if(!Object.keys(RealEstateToUpdate).length){
                throw new HttpException('Nada para atualizar', HttpStatus.BAD_REQUEST)
            }
            const Response = await this.realEstateService.updateRealEstateById(RealEstateParams.id, RealEstateToUpdate, req);
            return Response
        }
        catch(err){
            throw err
        }
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN, RolesEnum.CLIENT)
    @Put('deactivate/:id')
    async deactivateRealEstateById(@Param() RealEstateParams: RealEstateParamsDTO, @Request() req: any): Promise<FeedbackResponse>{
        try{
            const Response = await this.realEstateService.deactivateRealEstateById(RealEstateParams.id, req);
            return Response
        }
        catch(err){
            throw err
        }
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN, RolesEnum.CLIENT)
    @Put('activate/:id')
    async activateRealEstateById(@Param() RealEstateParams: RealEstateParamsDTO, @Request() req: any): Promise<FeedbackResponse>{
        try{
            const Response = await this.realEstateService.activateRealEstateById(RealEstateParams.id, req);
            return Response
        }
        catch(err){
            throw err
        }
    }
}
