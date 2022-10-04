import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddressEntity } from '../Entity';
import {
    AddressDTO,
    CreateAddressDTO,
    UpdateAddressDTO
} from '../DTO';
import {
    IndicatorEntity,
    IndicatorTypesEnum,
    IndicatorDTO
} from '../../indicator';
import {
    ViaCepService,
    OnlyNumbersRegex,
    FeedbackResponse,
    ActionsEnum,
    StatusEnum,
    OrderEnum
} from '../../utils';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AddressService {

    constructor(
        @InjectRepository(AddressEntity)
        private readonly addressRepository: Repository<AddressEntity>,

        @InjectRepository(IndicatorEntity)
        private readonly indicatorRepository: Repository<IndicatorEntity>,

        private readonly viaCepService: ViaCepService,
        private readonly configService: ConfigService
    ){}

    public async getAllUfs(): Promise<IndicatorDTO[]> {
        try{
            const UfList = await this.indicatorRepository.find({
                where: {
                    indicatorType: IndicatorTypesEnum.UF,
                    active: true
                },
                order: {
                    value: OrderEnum.ASC
                },
                take: this.configService.get<number>('DB_SEARCH_LIMIT')
            })

            return UfList
        }
        catch(err){
            throw err
        }
    }

    public async getAllLocalitiesByUfId(ufId: number, userInput?: string){
        try{
            const Uf = await this.indicatorRepository.findOne({
                where:{
                    id: ufId,
                }
            });

            if(!Uf.active){
                throw new HttpException('Esta UF esta desativada', HttpStatus.BAD_REQUEST);
            }

            const Localities = (await Uf.ufLocalities)
                                .filter(locality => locality.active && locality.value.toLowerCase().includes(userInput.toLowerCase() ?? ''))
                                .sort((a,b) => a.value.localeCompare(b.value))
                                .slice(0, this.configService.get<number>('DB_SEARCH_LIMIT'));
            
            return Localities
        }
        catch(err){
            throw err
        }
    }

    public async createNewAddress(addressToCreate: CreateAddressDTO): Promise<AddressDTO>{
        try{
            const NewAddressEntity = new AddressEntity();

            Object.keys(addressToCreate).forEach(key => {
                NewAddressEntity[key] = addressToCreate[key]
            });

            const NewAddress = await this.addressRepository.save(NewAddressEntity);

            return NewAddress
        }
        catch(err){
            throw err
        }
    }

    public async searchAddressByCEP(cep: string): Promise<CreateAddressDTO>{
        try{
            try{
                const FoundedAddress = await this.getAddressByCep(cep);
                const Response: CreateAddressDTO = { 
                    logradouro: FoundedAddress.logradouro,
                    numero: FoundedAddress.numero,
                    complemento: FoundedAddress.complemento,
                    bairro: FoundedAddress.bairro,
                    cep: FoundedAddress.cep,
                    uf: FoundedAddress.uf,
                    localidade: FoundedAddress.localidade,
                    active: FoundedAddress.active
                }
                return Response
            }
            catch(err: any){
                if(err instanceof HttpException){
                    if(err.getStatus() !== HttpStatus.NOT_FOUND){
                        throw err
                    }
                }
                else{
                    throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
                }
            }

            const ViaCepAddress = await this.viaCepService.searchAddress(cep);
            const Response: CreateAddressDTO = {
                logradouro: ViaCepAddress.logradouro,
                numero: '',
                complemento: ViaCepAddress.complemento,
                bairro: ViaCepAddress.bairro,
                cep: ViaCepAddress.cep.match(OnlyNumbersRegex)?.join(''),
                uf: await this.getUfById(Number(ViaCepAddress.ibge.slice(0,2))),
                localidade: await this.getLocalityById(Number(ViaCepAddress.ibge)),
                active: true
            }
            
            return Response
        }
        catch(err){
            throw err
        }
    }

    private async getAddressByCep(cep: string): Promise<AddressDTO>{
        try{
            const FoundedCep = await this.addressRepository.findOne({
                where: {
                    cep: cep 
                }
            })

            if(!FoundedCep){
                throw new HttpException(`O endereço com o CEP ${cep} não foi encontrado`, HttpStatus.NOT_FOUND);
            }

            delete FoundedCep.complemento;
            
            return FoundedCep
        }
        catch(err){
            throw err
        }
    }

    private async getAddressById(addressId: number): Promise<AddressDTO>{
        try{
            const FoundedCep = await this.addressRepository.findOne({
                where: {
                    id: addressId 
                }
            })

            if(!FoundedCep){
                throw new HttpException(`O endereço com o id ${addressId} não foi encontrado`, HttpStatus.NOT_FOUND);
            }

            return FoundedCep
        }
        catch(err){
            throw err
        }
    }

    private async getUfById(ufId: number){
        const FoundedUf = await this.indicatorRepository.findOne({
            where: {
                id: ufId,
                indicatorType: IndicatorTypesEnum.UF
            }
        })

        
        if(!FoundedUf){
            throw new HttpException(`Uf com o id ${ufId} não foi encontrada`, HttpStatus.NOT_FOUND)
        }

        if(!FoundedUf.active){
            throw new HttpException(`Uf "${FoundedUf.value}" esta desativada`, HttpStatus.BAD_REQUEST)
        }

        return FoundedUf
    }

    private async getLocalityById(localityId: number){
        const FoundedLocality = await this.indicatorRepository.findOne({
            where: {
                id: localityId,
                indicatorType: IndicatorTypesEnum.LOCALITY
            }
        })

        
        if(!FoundedLocality){
            throw new HttpException(`Localidade com o id ${localityId} não foi encontrada`, HttpStatus.NOT_FOUND)
        }

        if(!FoundedLocality.active){
            throw new HttpException(`Localidade "${FoundedLocality.value}" esta desativada`, HttpStatus.BAD_REQUEST)
        }

        return FoundedLocality
    }

    public async updateAddressById(addressId: number, addressToUpdate: UpdateAddressDTO){
        try{
            const FoundedAddress = await this.getAddressById(addressId);
            await this.addressRepository.update(addressId, addressToUpdate);
            const UpdateResponse: FeedbackResponse = {
                action: ActionsEnum.UPDATE,
                status: StatusEnum.SUCCESS,
                message: `Endereço '${FoundedAddress.cep}' alterado com sucesso`
            }

            return UpdateResponse
        }
        catch(err: any){

            const UpdateResponse: FeedbackResponse = {
                action: ActionsEnum.UPDATE,
                status: StatusEnum.ERROR,
                message: err.message
            }

            if(err instanceof HttpException){
                throw new HttpException(UpdateResponse, err.getStatus())
            }

            throw new HttpException(UpdateResponse, HttpStatus.BAD_REQUEST)
        }
    }
}
