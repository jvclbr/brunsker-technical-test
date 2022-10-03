import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity, UserEntitySubscriber } from '../Entity';
import { UserController } from '../Controller';
import { UserService } from '../Service';
@Module({
    imports: [
      TypeOrmModule.forFeature([UserEntity]),
    ],
    controllers: [ UserController ],
    providers: [ UserEntitySubscriber, UserService ],
    exports: [ UserService ]
  })
export class UserModule {}
