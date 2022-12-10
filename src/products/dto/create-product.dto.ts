import { ProductImageDto } from './product-image.dto';

export interface CreateProductDto {
  name: string;
  price: number;
  companyId: number;
  size: number;
  description: string;
  images: ProductImageDto[];
}
