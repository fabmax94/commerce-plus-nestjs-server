import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CompanyService } from './company.sevice';
import { Company } from './company.entity';
import { CreateCompanyDto } from './company.dto';


@Controller('companies')
export class CompanyController {
  constructor(private readonly companiesService: CompanyService) {
  }

  @Get()
  findAll(): Promise<Company[]> {
    return this.companiesService.findAll();
  }

  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto): Promise<Company> {
    return this.companiesService.create(createCompanyDto);
  }

  @Get(':id')
  findOne(@Param("id") id: number): Promise<Company> {
    return this.companiesService.findOne(id);
  }
}
