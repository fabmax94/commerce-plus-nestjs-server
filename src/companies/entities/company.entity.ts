import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { Rate } from '../../rates/entities/rate.entity';
import { SubType, Type } from '../companies.enum';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: Type,
    default: Type.RESTAURANT,
  })
  type: Type;

  @Column({
    type: 'enum',
    enum: SubType,
    default: SubType.MEET,
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

  @ManyToOne(() => User, (user) => user.companies, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'ownerId' })
  owner: User;

  @Column()
  ownerId: number;

  public get averageRate(): number {
    return this.rates.length
      ? this.rates.reduce((partialSum, rate) => partialSum + rate.score, 0) /
          this.rates.length
      : 0;
  }

  public get averagePrice(): number {
    const result = this.products.length
      ? this.products.reduce((partialSum, rate) => partialSum + rate.price, 0) /
        this.products.length
      : 0;

    return Number(result.toFixed(2));
  }
}
