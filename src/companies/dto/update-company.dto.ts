import { CreateCompanyDto } from './create-company.dto';

export interface UpdateCompanyDto extends CreateCompanyDto {
  id: number;
}
