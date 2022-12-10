import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Company } from '../../companies/entities/company.entity';
import { ProductImage } from './product-image.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'float' })
  price: number;

  @Column()
  size: number;

  @Column()
  description: string;

  @Column()
  companyId: number;

  @ManyToOne(() => Company, (company) => company.products, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'companyId' })
  company: Company;

  @Column({ default: false })
  isInactive: boolean;

  @OneToMany(() => ProductImage, (image) => image.product, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn()
  images: ProductImage[];
}
