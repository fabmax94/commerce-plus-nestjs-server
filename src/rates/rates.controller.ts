import { Controller, Post, Body } from '@nestjs/common';
import { RatesService } from './rates.service';
import { CreateRateDto } from './dto/create-rate.dto';

@Controller('rates')
export class RatesController {
  constructor(private readonly ratesService: RatesService) {}

  @Post()
  public create(@Body() createRateDto: CreateRateDto): Promise<void> {
    return this.ratesService.create(createRateDto);
  }
}
