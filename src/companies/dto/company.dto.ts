import { SubType, Type } from '../companies.enum';
import { UserDto } from '../../users/dto/user.dto';
import { RateDto } from '../../rates/dto/rate.dto';

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
  rates: RateDto[];

  public constructor(content: Partial<CompanyDto>) {
    Object.assign(this, content);
  }
}
