import {
    forwardRef,
    HttpException,
    HttpStatus,
    Inject,
    Injectable
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import {
    CredentialsDTO,
    JWTLoginResponseDTO,
    JWTPayloadDTO
} from '../DTO';
import { UserService, UserDTO } from '../../user';
import {
    ComparePassword,
    FixLazyLoadingProps
} from '../../utils'

@Injectable()
export class AuthService {

    constructor(
        @Inject(forwardRef(() => UserService))
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ){}

    public async validateUser(userCredentials: CredentialsDTO): Promise<UserDTO>{
        try{
            const FoundedUser = await this.userService.getUserByEmail(userCredentials.email, true);

            if(!FoundedUser.active){
                throw new HttpException('Usuario invalido', HttpStatus.UNAUTHORIZED)
            }

            if( !(await ComparePassword(userCredentials.password, FoundedUser.password)) ){
                throw new HttpException('Credenciais invalidas', HttpStatus.UNAUTHORIZED)
            }

            delete FoundedUser.password;
            return FoundedUser
        }
        catch(err){

            if(err instanceof HttpException){
                if(err.getStatus() === HttpStatus.NOT_FOUND){
                    throw new HttpException('Credenciais invalidas', HttpStatus.UNAUTHORIZED) 
                }
            }

            throw err
        }
    }

    public async login(currentUser: UserDTO): Promise<JWTLoginResponseDTO>{
        try{
            const Response = await this.generateJWT(currentUser);
            return Response
        }
        catch(err){
            throw err
        }
    }

    public async refreshToken(currentUser: UserDTO): Promise<JWTLoginResponseDTO>{
        try{
            const FoundedUser = await this.userService.getUserById(currentUser.id, false);

            if(!FoundedUser.active){
                throw new HttpException('Usuario invalido', HttpStatus.UNAUTHORIZED)
            }

            const Response = await this.generateJWT(FoundedUser);
            return Response
        }
        catch(err){
            throw err
        }
    }

    private async generateJWT(currentUser: UserDTO): Promise<JWTLoginResponseDTO>{
        const UserRoles = (await currentUser.roles)?.filter(role => role.active) ?? [];

        FixLazyLoadingProps(currentUser);

        const JWTPayload: JWTPayloadDTO = {
            user: currentUser,
            roles: UserRoles,
        }

        const AuthToken = this.jwtService.sign(JWTPayload);

        const Response: JWTLoginResponseDTO = {
            ...JWTPayload,
            authToken: AuthToken,
            expiresIn: Number(this.configService.get<number>('JWT_EXPIRES_IN'))
        }

        return Response
    }

}
