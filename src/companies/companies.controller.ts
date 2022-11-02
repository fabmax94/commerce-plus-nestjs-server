import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { AuthGuard } from '@nestjs/passport';
import { CompanyDto } from './dto/company.dto';
import { ProductDto } from '../products/dto/product.dto';

@Controller('companies')
export class CompaniesController {
  public constructor(private readonly companiesService: CompaniesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  public create(@Body() createCompanyDto: CreateCompanyDto): Promise<void> {
    return this.companiesService.create(createCompanyDto);
  }

  @Get()
  public findAll(): Promise<CompanyDto[]> {
    return this.companiesService.findAll();
  }

  @Get(':companyId/products')
  public findProductsByCompany(
    @Param('companyId', ParseIntPipe) companyId: number,
  ): Promise<ProductDto[]> {
    return this.companiesService.findProductsByCompany(companyId);
  }

  @Get(':id')
  public findOne(@Param('id', ParseIntPipe) id: number): Promise<CompanyDto> {
    return this.companiesService.findOne(id);
  }

  @Patch(':id')
  public update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ): Promise<void> {
    return this.companiesService.update(id, updateCompanyDto);
  }

  @Delete(':id')
  public remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.companiesService.remove(id);
  }
}
