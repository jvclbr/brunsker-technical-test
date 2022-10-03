import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from '../Controller';
import { AuthService } from '../Service';
import { JwtStrategy, LocalStrategy } from '../Strategies';
import { UserModule } from '../../user';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [ 
        PassportModule,
        JwtModule.registerAsync({
          useFactory: async (configService: ConfigService) => ({
            secret: configService.get<string>('JWT_SECRET_KEY'),
            signOptions: {
              expiresIn: Number(configService.get<number>('JWT_EXPIRES_IN'))
            }
          }),
          inject: [ConfigService]
        }),
        forwardRef(() => UserModule)
    ],
    controllers: [ AuthController ],
    providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy
    ]
})
export class AuthModule {}
