import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { Rate } from '../../rates/entities/rate.entity';
import { SubType, Type } from '../companies.enum';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: Type,
    default: Type.restaurant,
  })
  type: Type;

  @Column({
    type: 'enum',
    enum: SubType,
    default: SubType.meet,
  })
  subType: SubType;

  @Column()
  location: string;

  @Column()
  image: string;

  @OneToMany(() => Product, (product) => product.company, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn()
  products: Product[];

  @OneToMany(() => Rate, (rate) => rate.company, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn()
  rates: Rate[];

  public get averageRate(): number {
    return this.rates.length
      ? this.rates.reduce((partialSum, rate) => partialSum + rate.score, 0) /
          this.rates.length
      : 0;
  }
}
