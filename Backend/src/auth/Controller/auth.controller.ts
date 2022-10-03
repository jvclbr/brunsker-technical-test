import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CredentialsDTO, JWTLoginResponseDTO } from '../DTO';
import { JwtAuthGuard, LocalAuthGuard } from '../Guards';
import { AuthService } from '../Service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ){}

    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req, @Body() userCredentials: CredentialsDTO): Promise<JWTLoginResponseDTO> {
        try{
            const Response =  await this.authService.login(req.user);
            return Response
        }
        catch(err){
            throw err
        }
    }

    @ApiBearerAuth()
    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    @Get('refresh')
    async refreshToken(@Request() req): Promise<JWTLoginResponseDTO> {
        try{
            const Response =  await this.authService.refreshToken(req.user);
            return Response
        }
        catch(err){
            throw err
        }
    }
}
