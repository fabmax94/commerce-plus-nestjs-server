import { ProductImageDto } from './product-image.dto';

export class ProductDto {
  id: number;
  name: string;
  price: number;
  size: number;
  description: string;
  images: ProductImageDto[];

  public constructor(content: Partial<ProductDto>) {
    Object.assign(this, content);
  }
}
