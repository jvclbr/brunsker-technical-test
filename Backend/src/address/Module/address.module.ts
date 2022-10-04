import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressEntity } from '../Entity';
import { AddressController } from '../Controller';
import { AddressService } from '../Service';
import { IndicatorModule } from '../../indicator';
import { ViaCepService } from '../../utils';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AddressEntity
    ]),
    IndicatorModule
  ],
  controllers: [ AddressController ],
  providers: [ AddressService, ViaCepService ],
  exports: [ AddressService ]
})
export class AddressModule {}
