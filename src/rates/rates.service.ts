import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRateDto } from './dto/create-rate.dto';
import { Rate } from './entities/rate.entity';

@Injectable()
export class RatesService {
  constructor(
    @InjectRepository(Rate)
    private ratesRepository: Repository<Rate>,
  ) {}

  create(createRateDto: CreateRateDto) {
    return this.ratesRepository.save({
      ...createRateDto,
      score: Number(createRateDto.score),
    });
  }
}
