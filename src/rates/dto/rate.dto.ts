import { Rate } from '../entities/rate.entity';
import { UserDto } from '../../users/dto/user.dto';

export class RateDto {
  score: number;
  text: string;
  user: UserDto;

  public constructor(content: Partial<RateDto>) {
    Object.assign(this, content);
  }

  public static buildFromRate(rate: Rate): RateDto {
    return new RateDto({
      score: rate.score,
      text: rate.text,
      user: UserDto.buildFromUser(rate.user),
    });
  }
}
