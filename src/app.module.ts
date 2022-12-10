import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './companies/entities/company.entity';
import { Product } from './products/entities/product.entity';
import { User } from './users/entities/user.entity';
import { CompaniesModule } from './companies/companies.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { RatesModule } from './rates/rates.module';
import { Rate } from './rates/entities/rate.entity';
import { ProductImage } from './products/entities/product-image.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.env.${process.env.NODE_ENV}` }),
    TypeOrmModule.forRoot({
      url: process.env.DATABASE_URL,
      type: 'postgres',
      synchronize: true,
      database: process.env.POSTGRES_DB,
      entities: [Company, Product, User, Rate, ProductImage],
    }),
    CompaniesModule,
    ProductsModule,
    UsersModule,
    RatesModule,
  ],
})
export class AppModule {}
