import { SubType, Type } from '../companies.enum';

export class CreateCompanyDto {
  name: string;
  type: Type;
  subType: SubType;
  location: string;
  image: string;
}
