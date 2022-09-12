import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.sevice';
import { User } from './user.entity';

@Controller('auth/')
export class AuthController {
  constructor(private userService: UserService) { }

  @Post('signup')
  async signup(@Body() user: User): Promise<User> {
    return this.userService.signup(user);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.userService.login(req.user)
  }
}