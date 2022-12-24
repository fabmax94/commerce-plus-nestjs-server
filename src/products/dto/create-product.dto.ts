import { ProductImageDto } from './product-image.dto';

export interface CreateProductDto {
  name: string;
  price: number;
  companyId: number;
  description: string;
  images: ProductImageDto[];
}
