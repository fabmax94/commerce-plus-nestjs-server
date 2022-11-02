import { SubType, Type } from '../companies.enum';

export interface CreateCompanyDto {
  name: string;
  type: Type;
  subType: SubType;
  location: string;
  image: string;
}
