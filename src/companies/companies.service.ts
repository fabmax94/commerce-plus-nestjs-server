import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import { ProductsService } from '../products/products.service';
import { ProductDto } from '../products/dto/product.dto';
import { CompanyDto } from './dto/company.dto';

@Injectable()
export class CompaniesService {
  public constructor(
    @InjectRepository(Company)
    private companiesRepository: Repository<Company>,
    private productsService: ProductsService,
  ) {}

  public async create(createCompanyDto: CreateCompanyDto): Promise<void> {
    await this.companiesRepository.save(createCompanyDto);
  }

  public async findAll(): Promise<CompanyDto[]> {
    const companies = await this.companiesRepository.find({
      relations: {
        rates: true,
      },
    });

    return companies.map((company) => {
      return new CompanyDto({
        averageRate: company.averageRate,
        ...company,
      });
    });
  }

  public async findOne(id: number): Promise<CompanyDto> {
    const company = await this.companiesRepository.findOne({
      where: { id },
      relations: {
        rates: true,
      },
    });

    return new CompanyDto({
      averageRate: company.averageRate,
      ...company,
    });
  }

  public findProductsByCompany(companyId: number): Promise<ProductDto[]> {
    return this.productsService.findByCompanyId(companyId);
  }

  public async update(
    id: number,
    updateCompanyDto: UpdateCompanyDto,
  ): Promise<void> {
    await this.companiesRepository.update(id, updateCompanyDto);
  }

  public async remove(id: number): Promise<void> {
    await this.companiesRepository.delete(id);
  }
}
