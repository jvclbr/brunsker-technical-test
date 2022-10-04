import { CacheModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InterceptorModule } from './interceptor';
import { UserModule } from './user';
import { AuthModule } from './auth';
import { AddressModule } from './address';
import { IndicatorModule } from './indicator';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async (configService: ConfigService) => ({
        ttl: Number(configService.get<number>('CACHE_TTL')),
        max: Number(configService.get<number>('MAX_CACHE'))
      }),
      inject: [ConfigService]
    }), 
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        type: 'sqlite',
        database: `${configService.get<string>('DB_NAME')}.sqlite`,
        synchronize: JSON.parse(configService.get<string>('DB_SYNC')),
        logging: JSON.parse(configService.get<string>('DB_LOG')),
        autoLoadEntities: true,
      }),
      inject: [ConfigService]
    }),
    InterceptorModule,
    UserModule,
    AuthModule,
    AddressModule,
    IndicatorModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
