class CreateProductCompanyDto {
  id: number;
}

export class CreateProductDto {
  name: string;
  price: number;
  company: CreateProductCompanyDto;
}
