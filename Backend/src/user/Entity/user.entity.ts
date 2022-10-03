import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    EventSubscriber,
    EntitySubscriberInterface,
    Connection,
    InsertEvent,
    UpdateEvent,
    ManyToMany,
    JoinTable
} from 'typeorm';

import { IndicatorEntity } from '../../indicator/Entities/indicators.entity';
import { HashPassword } from '../../utils/Services'

@Entity()
export class UserEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ default: true })
  active: boolean;

  @ManyToMany(() => IndicatorEntity)
  @JoinTable({
    name: 'users_roles_entity',
    inverseJoinColumn: {
      name: 'roleEntityId',
    },
  })
  roles: Promise<IndicatorEntity[]>;
}

@EventSubscriber()
export class UserEntitySubscriber implements EntitySubscriberInterface<UserEntity> {
  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return UserEntity;
  }

  async beforeInsert(event: InsertEvent<UserEntity>) {
    event.entity['password'] = await HashPassword(event.entity['password'])
  }

  async beforeUpdate(event: UpdateEvent<UserEntity>) {
    if(event.entity['password']){
      event.entity['password'] = await HashPassword(event.entity['password'])
    }
  }
}