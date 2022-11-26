import { SubType, Type } from '../companies.enum';
import { UserDto } from '../../users/dto/user.dto';

export class CompanyDto {
  id: number;
  name: string;
  type: Type;
  subType: SubType;
  location: string;
  image: string;
  averageRate: number;
  averagePrice: number;
  owner: UserDto;

  public constructor(content: Partial<CompanyDto>) {
    Object.assign(this, content);
  }
}
