import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  ManyToMany,
  JoinTable
} from 'typeorm';

import { IndicatorTypeEntity } from './indicatorType.entity';

@Entity()
export class IndicatorEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  value: string;

  @Column()
  description: string;

  @Column({ default: true })
  active: boolean;

  @ManyToOne(
    () => IndicatorTypeEntity,
    (indicatorType) => indicatorType.indicators,
  )
  indicatorType: Promise<IndicatorTypeEntity>;

  
  @ManyToMany(() => IndicatorEntity, indicator => indicator.ufLocalities)
  @JoinTable({ 
    name: 'ufs_localities_entity',
    joinColumn: {
      name: 'ufId',
    },
    inverseJoinColumn: {
      name: 'localityId',
    },
  })
  ufLocalities: Promise<IndicatorEntity[]>;

}
