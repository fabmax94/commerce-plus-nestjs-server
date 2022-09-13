import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './company/company.entity';
import { CompanyModule } from './company/company.module';
import { ProductModule } from './product/product.module';
import { Product } from './product/product.entity';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'commerce',
      entities: [Company, Product, User],
      synchronize: true,
    }),
    CompanyModule,
    ProductModule,
    AuthModule,
  ],
})
export class AppModule {}
