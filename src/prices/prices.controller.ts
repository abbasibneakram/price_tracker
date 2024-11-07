import { Controller, Get, Query, Param } from '@nestjs/common';
import { PriceService } from './prices.service';

@Controller('price')
export class PriceController {
  constructor(private readonly priceService: PriceService) {}

  @Get(':chain/hourly')
  async getHourlyPrices(@Param('chain') chain: string) {
    return this.priceService.getHourlyPrices(chain);
  }

  @Get('swap-rate')
  async getSwapRate(@Query('ethAmount') ethAmount: number) {
    return this.priceService.getSwapRate(ethAmount);
  }
}
