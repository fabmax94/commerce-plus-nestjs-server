import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { ProductDto } from './dto/product.dto';
import { ProductImage } from './entities/product-image.entity';

@Injectable()
export class ProductsService {
  public constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(ProductImage)
    private productImagesRepository: Repository<ProductImage>,
  ) {}

  public async create(createProductDto: CreateProductDto): Promise<void> {
    await this.productsRepository.save(createProductDto);
  }

  public async findAll(): Promise<ProductDto[]> {
    const products = await this.productsRepository.find({
      relations: {
        company: true,
        images: true,
      },
    });
    return products.map((product) => new ProductDto(product));
  }

  public async findByCompanyId(companyId: number): Promise<ProductDto[]> {
    const products = await this.productsRepository.find({
      where: {
        company: {
          id: companyId,
        },
      },
      relations: {
        images: true,
      },
    });

    return products.map((product) => new ProductDto(product));
  }

  public async findOne(id: number): Promise<ProductDto> {
    const product = await this.productsRepository.findOne({
      where: { id },
    });

    return new ProductDto(product);
  }

  public async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<void> {
    await this.productsRepository.save({
      id,
      ...updateProductDto,
    });
  }

  public async remove(id: number): Promise<void> {
    await this.productImagesRepository.delete({ product: { id: id } });
    await this.productsRepository.delete(id);
  }
}
