import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn
} from 'typeorm';
import { IndicatorEntity } from '../../indicator/Entities/indicators.entity';
import { UserEntity } from '../../user/Entity/user.entity';
import { AddressEntity } from '../../address/Entity/address.entity';

@Entity()
export class RealEstateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ type: 'decimal', precision: 9, scale: 2, default: 0, })
  valor: number;

  @Column({ type: 'decimal', precision: 6, scale: 2, default: 0, })
  condominio: number;

  @Column()
  quartos: number;

  @Column()
  banheiros: number;

  @Column()
  mobiliado: boolean;

  @Column()
  area: number;

  @Column()
  venda: boolean;

  @Column()
  aluguel: boolean;

  @CreateDateColumn()
  dataAnuncio: Date;

  @Column({ default: true })
  active: boolean;

  @ManyToOne(() => IndicatorEntity, {
    eager: true,
  })
  type: IndicatorEntity;

  @ManyToOne(() => AddressEntity, {
    eager: true
  })
  address: AddressEntity;

  @ManyToOne(() => UserEntity)
  user: Promise<UserEntity>;
}
