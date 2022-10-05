import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RealEstateController } from '../Controller';
import { RealEstateService } from '../Service';
import { RealEstateEntity } from '../Entity';
import { AddressModule } from '../../address';
import { UserModule } from '../../user';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RealEstateEntity
    ]),
    AddressModule,
    forwardRef(() => UserModule),
  ],
  controllers: [RealEstateController],
  providers: [RealEstateService]
})
export class RealEstateModule {}
