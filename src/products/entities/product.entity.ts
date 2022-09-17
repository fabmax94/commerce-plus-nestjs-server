import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Company } from '../../companies/entities/company.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  size: number;

  @Column()
  description: string;

  @Column()
  image: string;

  @ManyToOne(() => Company, (company) => company.products, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'companyId' })
  company: Company;
}
