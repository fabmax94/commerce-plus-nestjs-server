import { SubType, Type } from '../companies.enum';

export class CompanyDto {
  id: number;
  name: string;
  type: Type;
  subType: SubType;
  location: string;
  image: string;
  averageRate: number;

  public constructor(content: Partial<CompanyDto>) {
    Object.assign(this, content);
  }
}
