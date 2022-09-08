import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Company } from '../company/company.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @ManyToOne(type => Company, company => company.products, { cascade: ['insert', 'update'] })
  @JoinColumn({ name: 'companyId' })
  company: Company;

}