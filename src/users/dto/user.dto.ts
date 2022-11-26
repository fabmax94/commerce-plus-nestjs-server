import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UserDto extends PartialType(CreateUserDto) {
  id: number;

  public constructor(content: Partial<UserDto>) {
    super();
    Object.assign(this, content);
  }
}
