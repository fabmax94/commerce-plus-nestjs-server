import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './companies/entities/company.entity';
import { Product } from './products/entities/product.entity';
import { User } from './users/entities/user.entity';
import { CompaniesModule } from './companies/companies.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'commerce',
      entities: [Company, Product, User],
      synchronize: true,
    }),
    CompaniesModule,
    ProductsModule,
    UsersModule,
  ],
})
export class AppModule {}
