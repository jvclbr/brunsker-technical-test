import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany
} from 'typeorm';
import { IndicatorEntity } from '../../indicator/Entities/indicators.entity';

@Entity()
export class AddressEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'BR'})
  pais: string;

  @Column()
  logradouro: string;

  @Column()
  numero: string;

  @Column({ nullable: true })
  complemento: string;

  @Column()
  bairro: string;

  @Column()
  cep: string;

  @Column({ default: true })
  active: boolean;

  @ManyToOne(() => IndicatorEntity, {
    eager: true,
  })
  uf: IndicatorEntity;

  @ManyToOne(() => IndicatorEntity, {
    eager: true,
  })
  localidade: IndicatorEntity;
}
