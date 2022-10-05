import {
    forwardRef,
    HttpException,
    HttpStatus,
    Inject,
    Injectable
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RealEstateEntity } from '../Entity';
import { CreateRealEstateDTO, RealEstateDTO, UpdateRealEstateDTO } from '../DTO';
import { AddressService } from '../../address';
import { UserDTO } from '../../user';
import {
    ActionsEnum,
    CheckAccessPermissionOnObject,
    FeedbackResponse,
    StatusEnum,
    FixLazyLoadingProps
} from '../../utils';
import { UserService } from '../../user';

@Injectable()
export class RealEstateService {

    constructor(
        @InjectRepository(RealEstateEntity)
        private readonly realEstateRepository: Repository<RealEstateEntity>,

        private readonly addressService: AddressService,
        
        @Inject(forwardRef(() => UserService))
        private readonly userService: UserService
    ){}



    public async createNewRealEstate(RealEstateToCreate: CreateRealEstateDTO, currentUser: UserDTO): Promise<RealEstateDTO> {
        try{

            const NewRealEstateEntity = new RealEstateEntity();

            Object.keys(RealEstateToCreate).forEach(key => {
                NewRealEstateEntity[key] = RealEstateToCreate[key]
            });

            NewRealEstateEntity.user = Promise.resolve(currentUser);

            const RealEstateAddress = await this.addressService.createNewAddress(RealEstateToCreate.address);
            NewRealEstateEntity.address = RealEstateAddress;

            const NewRealEstate = await this.realEstateRepository.save(NewRealEstateEntity);

            FixLazyLoadingProps(NewRealEstate);

            return NewRealEstate
        }
        catch(err){
            throw err
        }
    }

    public async getAllRealEstates():Promise<RealEstateDTO[]> {
        try{
            const RealEstateList = await this.realEstateRepository.find();
            return RealEstateList
        }
        catch(err){
            throw err
        }
    }

    public async getAllUserRealEstates(currentUser: UserDTO): Promise<RealEstateDTO[]> {
        try{
            const RealEstateList = await this.realEstateRepository.find({
                where: {
                    user: currentUser.id
                }
            })

            return RealEstateList
        }
        catch(err){
            throw err
        }
    }

    public async getAllUserFavRealEstates(currentUser: UserDTO, req: any): Promise<RealEstateDTO[]> {
        try{
            const CurrentUser = await this.userService.getUserByIdProtected(currentUser.id, req)
            const RealEstateList = await CurrentUser.favList;
            return RealEstateList
        }
        catch(err){
            throw err
        }
    }

    public async addRealEstateToUserFav(realEstateId: number, req: any): Promise<RealEstateDTO[]> {
        try{
            const targetRealEstate = await this.getRealEstateById(realEstateId);
            const UserFavList = await this.userService.addRealEstateToUserFavList(targetRealEstate, req);
            return UserFavList
        }
        catch(err){
            throw err
        }
    }

    public async removeRealEstateFromUserFav(realEstateId: number, req: any): Promise<RealEstateDTO[]> {
        try{
            const targetRealEstate = await this.getRealEstateById(realEstateId);
            const UserFavList = await this.userService.removeRealEstateToUserFavList(targetRealEstate, req);
            return UserFavList
        }
        catch(err){
            throw err
        }
    }

    public async getRealEstateByIdProtected(RealEstateId: number, req: any): Promise<RealEstateDTO> {
        try{
            const FoundedRealEstate = await this.realEstateRepository.findOne({
                where: {
                    id: RealEstateId
                }
            })

            if(!FoundedRealEstate){
                throw new HttpException('Imovel não encontrado', HttpStatus.NOT_FOUND)
            }

            const RealEstateUser = await FoundedRealEstate.user;

            CheckAccessPermissionOnObject(RealEstateUser.id, req);

            FixLazyLoadingProps(FoundedRealEstate);

            return FoundedRealEstate
        }
        catch(err){
            throw err
        }
    }

    public async getRealEstateById(RealEstateId: number): Promise<RealEstateDTO> {
        try{
            const FoundedRealEstate = await this.realEstateRepository.findOne({
                where: {
                    id: RealEstateId
                }
            })

            if(!FoundedRealEstate){
                throw new HttpException('Imovel não encontrado', HttpStatus.NOT_FOUND)
            }

            return FoundedRealEstate
        }
        catch(err){
            throw err
        }
    }

    public async updateRealEstateById(RealEstateId: number, RealEstateToUpdate: UpdateRealEstateDTO, req: any): Promise<FeedbackResponse>{
        try{
            const FoundedRealEstate = await this.getRealEstateByIdProtected(RealEstateId, req);

            if(RealEstateToUpdate.address){
                await this.addressService.updateAddressById(FoundedRealEstate.address.id, RealEstateToUpdate.address);
                delete RealEstateToUpdate.address;
            }

            await this.realEstateRepository.update(RealEstateId, RealEstateToUpdate);
            const UpdateResponse: FeedbackResponse = {
                action: ActionsEnum.UPDATE,
                status: StatusEnum.SUCCESS,
                message: `Imovel '${RealEstateToUpdate.nome || FoundedRealEstate.nome}' alterado com sucesso`
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

    public async deactivateRealEstateById(RealEstateId: number, req: any): Promise<FeedbackResponse> {
        try{
            const FoundedRealEstate = await this.getRealEstateByIdProtected(RealEstateId, req);
            if(!FoundedRealEstate.active){
                throw new HttpException(`Imovel '${FoundedRealEstate.nome}' já esta desativado`, HttpStatus.BAD_REQUEST)
            }
            await this.realEstateRepository.update(RealEstateId, { ...FoundedRealEstate, active: false });
            const DeactivateResponse: FeedbackResponse = {
                action: ActionsEnum.DEACTIVATE,
                status: StatusEnum.SUCCESS,
                message: `Imovel '${FoundedRealEstate.nome}' desativado com sucesso`
            }

            return DeactivateResponse
 
        }
        catch(err: any){
            const DeactivateResponse: FeedbackResponse = {
                action: ActionsEnum.DEACTIVATE,
                status: StatusEnum.ERROR,
                message: err.message
            }

            if(err instanceof HttpException){
                throw new HttpException(DeactivateResponse, err.getStatus())
            }

            throw new HttpException(DeactivateResponse, HttpStatus.BAD_REQUEST)        
        }
    }

    public async activateRealEstateById(RealEstateId: number, req: any) {
        try{
            const FoundedRealEstate = await this.getRealEstateByIdProtected(RealEstateId, req);
            if(FoundedRealEstate.active){
                throw new HttpException(`Imovel '${FoundedRealEstate.nome}' já esta ativado`, HttpStatus.BAD_REQUEST)
            }
            await this.realEstateRepository.update(RealEstateId, { ...FoundedRealEstate, active: true });
            const ActivateResponse: FeedbackResponse = {
                action: ActionsEnum.ACTIVATE,
                status: StatusEnum.SUCCESS,
                message: `Imovel '${FoundedRealEstate.nome}' ativado com sucesso`
            }

            return ActivateResponse
 
        }
        catch(err: any){
            const ActivateResponse: FeedbackResponse = {
                action: ActionsEnum.ACTIVATE,
                status: StatusEnum.ERROR,
                message: err.message
            }

            if(err instanceof HttpException){
                throw new HttpException(ActivateResponse, err.getStatus())
            }

            throw new HttpException(ActivateResponse, HttpStatus.BAD_REQUEST)        
        }
    }
}
