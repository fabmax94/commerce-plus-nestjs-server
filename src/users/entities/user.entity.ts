import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Rate } from '../../rates/entities/rate.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Rate, (rate) => rate.user, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn()
  rates: Rate[];
}
