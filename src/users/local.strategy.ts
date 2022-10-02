import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super();
  }

  async validate(email: string, password: string): Promise<any> {
    const foundUser = await this.usersService.validateUser({
      email,
      password,
    } as UserDto);

    if (!foundUser) {
      throw new UnauthorizedException();
    }
    return foundUser;
  }
}
