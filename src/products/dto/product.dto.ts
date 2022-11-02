export class ProductDto {
  id: number;
  name: string;
  price: number;
  size: number;
  description: string;
  image: string;

  public constructor(content: Partial<ProductDto>) {
    Object.assign(this, content);
  }
}
