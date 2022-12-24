import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { User } from '../entities/user.entity';

export class UserDto extends PartialType(CreateUserDto) {
  id: number;
  name: string;

  public constructor(content: Partial<UserDto>) {
    super();
    Object.assign(this, content);
  }

  public static buildFromUser(user: User): UserDto {
    return new UserDto({
      id: user.id,
      name: user.name,
    });
  }
}
