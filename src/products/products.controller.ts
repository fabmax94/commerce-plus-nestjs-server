import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductDto } from './dto/product.dto';

@Controller('products')
export class ProductsController {
  public constructor(private readonly productsService: ProductsService) {}

  @Post()
  public create(@Body() createProductDto: CreateProductDto): Promise<void> {
    return this.productsService.create(createProductDto);
  }

  @Get()
  public findAll(): Promise<ProductDto[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  public findOne(@Param('id', ParseIntPipe) id: number): Promise<ProductDto> {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  public update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<void> {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  public remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.productsService.remove(id);
  }
}
