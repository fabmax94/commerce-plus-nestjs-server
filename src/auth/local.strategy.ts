import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.sevice';
import { UserDto } from './user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const foundUser = await this.userService.validateUser({
      username,
      password,
    } as UserDto);

    if (!foundUser) {
      throw new UnauthorizedException();
    }
    return foundUser;
  }
}
