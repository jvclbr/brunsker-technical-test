import {
    CacheInterceptor,
    Controller,
    Get,
    Param,
    Query, 
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import { AddressService } from '../Service';
import {
    CreateAddressDTO,
    AddressParamsDTO,
    SearchAddressParam,
    AddressTypeAheadQuery
} from '../DTO';
import {
    JwtAuthGuard,
    RolesGuard
} from '../../auth/Guards';
import { Roles } from '../../auth/Decorators';
import { RolesEnum } from '../../auth/Enums';
import { IndicatorDTO } from '../../indicator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@ApiBearerAuth()
@ApiTags('Address')
@Controller('address')
export class AddressController {

    constructor(
        private readonly addressService: AddressService
    ){}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN, RolesEnum.CLIENT)
    @UseInterceptors(CacheInterceptor)
    @Get('cep/:cep')
    public async searchAddressByCep(@Param() searchAddressParam: SearchAddressParam): Promise<CreateAddressDTO>{
        try{
            const Response = this.addressService.searchAddressByCEP(searchAddressParam.cep);
            return Response
        }
        catch(err){
            throw err
        }
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN, RolesEnum.CLIENT)
    @UseInterceptors(CacheInterceptor)
    @Get('uf')
    public async getAllUfs(): Promise<IndicatorDTO[]>{
        try{
            const Response = await this.addressService.getAllUfs();
            return Response
        }
        catch(err){
            throw err
        }
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN, RolesEnum.CLIENT)
    @Get('locality/:id')
    public async getAllLocalitiesByUfId(@Param() addressParamsDTO: AddressParamsDTO, @Query() addressTypeAheadQuery: AddressTypeAheadQuery): Promise<IndicatorDTO[]>{
        try{
            const Response = await this.addressService.getAllLocalitiesByUfId(addressParamsDTO.id, addressTypeAheadQuery.userInput);
            return Response
        }
        catch(err){
            throw err
        }
    }
}
