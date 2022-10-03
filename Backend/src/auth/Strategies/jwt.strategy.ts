import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { JWTPayloadDTO } from '../DTO';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor( 
        private readonly configService: ConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: (arguments[0] as ConfigService).get<string>('JWT_SECRET_KEY')
        });
    }

    async validate(JWTPayload: JWTPayloadDTO): Promise<JWTPayloadDTO> {
        return JWTPayload;
    };
}