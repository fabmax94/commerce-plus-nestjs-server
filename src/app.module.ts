import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './company/company.entity';
import { CompanyModule } from './company/company.module';
import { ProductModule } from './product/product.module';
import { Product } from './product/product.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'commerce',
      entities: [Company, Product],
      synchronize: true,
    }),
    CompanyModule,
    ProductModule,
  ],
})
export class AppModule {
}
