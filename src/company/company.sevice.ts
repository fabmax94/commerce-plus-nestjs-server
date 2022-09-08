import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './company.entity';
import { CreateCompanyDto } from './company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companiesRepository: Repository<Company>,
  ) {
  }

  findAll(): Promise<Company[]> {
    return this.companiesRepository.find({
      relations: {
        products: true,
      },
    });
  }

  findOne(id: number): Promise<Company> {
    return this.companiesRepository.findOne({
      where: { id }, relations: {
        products: true,
      },
    });
  }

  create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    return this.companiesRepository.save(createCompanyDto);
  }
}