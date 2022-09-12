import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './company.entity';
import { CreateCompanyDto } from './company.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { UserLoginDto } from './user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>, private jwt: JwtService
  ) {
  }

  async signup(user: User): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    return await this.usersRepository.save(user);
  }

  async validateUser(user: UserLoginDto): Promise<any> {
    const foundUser = await this.usersRepository.findOne({ where: { username: user.username } });
    if (foundUser) {
      if (await bcrypt.compare(user.password, foundUser.password)) {
        const { password, ...result } = foundUser;
        return result;
      }

      return null;
    }
    return null;

  }

  async login(user: UserLoginDto) {
    const payload = { username: user.username, sub: user.id, role: user.role };

    return {
      access_token: this.jwt.sign(payload),
    };
  }

  create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    return this.usersRepository.save(createCompanyDto);
  }
}