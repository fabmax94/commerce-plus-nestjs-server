import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.sevice';
import { Company } from './company.entity';
import { CreateCompanyDto } from './company.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('companies')
export class CompanyController {
  constructor(private readonly companiesService: CompanyService) {}

  @Get()
  findAll(): Promise<Company[]> {
    return this.companiesService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto): Promise<Company> {
    return this.companiesService.create(createCompanyDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Company> {
    return this.companiesService.findOne(id);
  }
}
