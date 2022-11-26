import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private jwt: JwtService,
  ) {}
  public async signup(createUserDto: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt();
    createUserDto.password = await bcrypt.hash(createUserDto.password, salt);
    return await this.usersRepository.save(createUserDto);
  }

  public async validateUser(updateUserDto: UserDto): Promise<UserDto> {
    const foundUser = await this.usersRepository.findOne({
      where: { email: updateUserDto.email },
    });
    if (foundUser) {
      if (await bcrypt.compare(updateUserDto.password, foundUser.password)) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = foundUser;
        return result as UserDto;
      }

      return null;
    }
    return null;
  }

  public async login(user: any) {
    return {
      access_token: this.jwt.sign(user),
      ...user,
    };
  }

  public async update(id: number, updateUserDto: UserDto): Promise<UserDto> {
    await this.usersRepository.update(id, updateUserDto);

    const user = await this.usersRepository.findOne({
      where: {
        id,
      },
    });

    return new UserDto(user);
  }
}
