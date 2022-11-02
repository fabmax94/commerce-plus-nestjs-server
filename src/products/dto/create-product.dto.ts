interface CreateProductCompanyDto {
  id: number;
}

export interface CreateProductDto {
  name: string;
  price: number;
  company: CreateProductCompanyDto;
  size: number;
  description: string;
  image: string;
}
