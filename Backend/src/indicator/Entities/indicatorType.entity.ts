import {
    Entity,
    Column,
    PrimaryColumn,
    OneToMany
  } from 'typeorm';

  import { IndicatorEntity } from './indicators.entity';
  
  @Entity()
  export class IndicatorTypeEntity {
    @PrimaryColumn()
    id: number;

    @Column()
    type: string;
  
    @Column()
    description: string;

    @Column({ default: true })
    active: boolean;

    @OneToMany(() => IndicatorEntity, indicator => indicator.indicatorType)
    indicators: Promise<IndicatorEntity[]>;
  }