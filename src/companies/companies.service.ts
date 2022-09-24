import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private companiesRepository: Repository<Company>,
  ) {}

  create(createCompanyDto: CreateCompanyDto) {
    return this.companiesRepository.save(createCompanyDto);
  }

  async findAll() {
    const companies = await this.companiesRepository.find({
      relations: {
        products: true,
        rates: true,
      },
    });
    return companies.map((company) => {
      const averageRate = company.rates.length
        ? company.rates.reduce(
            (partialSum, rate) => partialSum + rate.score,
            0,
          ) / company.rates.length
        : 0;

      return {
        averageRate,
        ...company,
      };
    });
  }

  findOne(id: number) {
    return this.companiesRepository.findOne({
      where: { id },
      relations: {
        products: true,
      },
    });
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return this.companiesRepository.update(id, updateCompanyDto);
  }

  remove(id: number) {
    return this.companiesRepository.delete(id);
  }
}
