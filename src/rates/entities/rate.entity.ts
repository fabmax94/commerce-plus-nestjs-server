import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Company } from '../../companies/entities/company.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Rate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'float' })
  score: number;

  @Column({ name: 'companyId' })
  companyId: number;

  @Column({ name: 'userId' })
  userId: number;

  @ManyToOne(() => Company, (company) => company.rates, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'companyId' })
  company: Company;

  @ManyToOne(() => User, (user) => user.rates, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'userId' })
  user: User;
}
