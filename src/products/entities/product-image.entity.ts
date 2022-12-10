import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class ProductImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  data: string;

  @ManyToOne(() => Product, (product) => product.images, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'productId' })
  product: Product;
}
