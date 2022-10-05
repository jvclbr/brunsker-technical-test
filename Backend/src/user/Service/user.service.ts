import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../Entity';
import {
    UserDTO,
    CreateUserDTO,
    UpdateUserDTO
} from '../DTO';
import {
    FeedbackResponse,
    ActionsEnum,
    StatusEnum,
    CheckAccessPermissionOnObject,
    FixLazyLoadingProps, 
} from '../../utils';
import { IndicatorEntity, IndicatorTypesEnum } from '../../indicator';
import { RolesEnum } from '../../auth';
import { RealEstateDTO } from '../../real-estate';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,

        @InjectRepository(IndicatorEntity)
        private readonly indicatorRepository: Repository<IndicatorEntity>,
    ) {}

    public async getAllUsers(): Promise<UserDTO[]>{
        try{
            const UsersList = await this.userRepository.find();
            return UsersList 
        }
        catch(err){
            throw err
        }
    }

    public async createNewUser(userToCreate: CreateUserDTO): Promise<UserDTO>{
        try{

            const UserRole = await this.indicatorRepository.findOne({
                where:{
                    id: RolesEnum.CLIENT,
                    indicatorType: IndicatorTypesEnum.ROLE
                }
            })

            if(!UserRole){
                throw new HttpException(`Cargo com o id ${RolesEnum.CLIENT} não foi encontrado`, HttpStatus.NOT_FOUND)
            }

            if(!UserRole.active){
                throw new HttpException(`Cargo "${UserRole.value}" esta desativado`, HttpStatus.BAD_REQUEST)
            }

            const DuplicateEmailCOunt = await this.userRepository.count({
                where: [
                    {
                        email: userToCreate.email
                    }
                ]
            })

            if(DuplicateEmailCOunt){
                throw new HttpException(`Já existe um usuario cadastrado com o email '${userToCreate.email}'`, HttpStatus.BAD_REQUEST)
            }

            const NewUserEntity = new UserEntity();

            Object.keys(userToCreate).forEach(key => {
                NewUserEntity[key] = userToCreate[key]
            });

            NewUserEntity.roles = Promise.resolve([
                UserRole
            ])

            const NewUser = await this.userRepository.save(NewUserEntity);
            delete NewUser.password;
            FixLazyLoadingProps(NewUser);
            return NewUser
        }
        catch(err){
            throw err
        }
    }

    public async getUserByIdProtected(userId: number, req){
        try{
            const FoundedUser = await this.userRepository.findOne({
                where: {
                    id: userId
                }
            })

            if(!FoundedUser){
                throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND)
            }

            CheckAccessPermissionOnObject(FoundedUser.id, req);

            return FoundedUser
        }
        catch(err){
            throw err
        }
    }

    public async getUserById(userId: number, showPassword: boolean = false): Promise<UserDTO>{
        try{
            const FoundedUser = await this.userRepository.findOne(
                showPassword ? {
                    
                    select: [
                        'id',
                        'name',
                        'email',
                        'password',
                        'active'
                    ],
                    where: {
                        id: userId
                    }

                } : {

                    where: {
                        id: userId
                    }
                    
                }
            );

            if(!FoundedUser){
                throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND)
            }
            
            return FoundedUser 
        }
        catch(err){
            throw err
        }
    }

    public async getUserByEmail(userEmail: string, showPassword: boolean = false): Promise<UserDTO>{
        try{
            const FoundedUser = await this.userRepository.findOne(
                showPassword ? {
                    
                    select: [
                        'id',
                        'name',
                        'email',
                        'password',
                        'active'
                    ],
                    where: {
                        email: userEmail
                    }

                } : {

                    where: {
                        email: userEmail
                    }
                    
                }    
            );

            if(!FoundedUser){
                throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND)
            }

            return FoundedUser 
        }
        catch(err){
            throw err
        }
    }

    
    public async updateUserByid(userId: number, userToUpdate: UpdateUserDTO, req: any): Promise<FeedbackResponse>{
        try{
            const FoundedUser = await this.getUserByIdProtected(userId, req);
            await this.userRepository.update(userId, userToUpdate);
            const UpdateResponse: FeedbackResponse = {
                action: ActionsEnum.UPDATE,
                status: StatusEnum.SUCCESS,
                message: `Usuário '${userToUpdate.name || FoundedUser.name}' alterado com sucesso`
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

    public async deactivateUserById(userId: number, req: any): Promise<FeedbackResponse>{
        try{
            const FoundedUser = await this.getUserByIdProtected(userId, req);
            if(!FoundedUser.active){
                throw new HttpException(`Usuário '${FoundedUser.name}' já esta desativado`, HttpStatus.BAD_REQUEST)
            }
            await this.userRepository.update(userId, { ...FoundedUser, active: false });
            const DeactivateResponse: FeedbackResponse = {
                action: ActionsEnum.DEACTIVATE,
                status: StatusEnum.SUCCESS,
                message: `Usuário '${FoundedUser.name}' desativado com sucesso`
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

    public async activateUserById(userId: number, req: any): Promise<FeedbackResponse>{
        try{
            const FoundedUser = await this.getUserByIdProtected(userId, req);
            if(FoundedUser.active){
                throw new HttpException(`Usuário '${FoundedUser.name}' já esta ativado`, HttpStatus.BAD_REQUEST)
            }
            await this.userRepository.update(userId, { ...FoundedUser, active: true });
            const ActivateResponse: FeedbackResponse = {
                action: ActionsEnum.ACTIVATE,
                status: StatusEnum.SUCCESS,
                message: `Usuário '${FoundedUser.name}' ativado com sucesso`
            }

            return ActivateResponse
 
        }
        catch(err: any){
            const ActivateResponse: FeedbackResponse = {
                action: ActionsEnum.DEACTIVATE,
                status: StatusEnum.ERROR,
                message: err.message
            }

            if(err instanceof HttpException){
                throw new HttpException(ActivateResponse, err.getStatus())
            }

            throw new HttpException(ActivateResponse, HttpStatus.BAD_REQUEST)        
        }
    }

    public async addRealEstateToUserFavList(realEstateToAdd: RealEstateDTO, req: any): Promise<RealEstateDTO[]>{
        try{
            const CurrentUser = await this.getUserByIdProtected(req.user.id, req);
            const FavList = await CurrentUser.favList;
            if(FavList.filter(fav => fav.id === realEstateToAdd.id).length){
                throw new HttpException(`O Imovel '${realEstateToAdd.id}' já esta na lista de favoritos do usuario '${CurrentUser.id}'`, HttpStatus.BAD_REQUEST)   
            }
            FavList.push(realEstateToAdd);
            CurrentUser.favList = Promise.resolve(FavList);
            await this.userRepository.save(CurrentUser);
            return FavList
        }
        catch(err: any){
            throw err
        }
    }

    public async removeRealEstateToUserFavList(realEstateToAdd: RealEstateDTO, req: any): Promise<RealEstateDTO[]>{
        try{
            const CurrentUser = await this.getUserByIdProtected(req.user.id, req);
            const FavList = await CurrentUser.favList;
            const TargetRealEstateIndex = FavList.findIndex(fav => fav.id === realEstateToAdd.id);
            if(TargetRealEstateIndex === -1){
                throw new HttpException(`O Imovel '${realEstateToAdd.id}' não esta na lista de favoritos do usuario '${CurrentUser.id}'`, HttpStatus.BAD_REQUEST)   
            }
            FavList.splice(TargetRealEstateIndex, 1);
            CurrentUser.favList = Promise.resolve(FavList);
            await this.userRepository.save(CurrentUser);
            return FavList
        }
        catch(err: any){
            throw err
        }
    }

}
