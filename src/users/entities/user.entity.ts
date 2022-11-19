import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Rate } from '../../rates/entities/rate.entity';
import { Company } from '../../companies/entities/company.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @OneToMany(() => Rate, (rate) => rate.user, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn()
  rates: Rate[];

  @OneToMany(() => Company, (company) => company.owner, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn()
  companies: Company[];
}
