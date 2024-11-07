import { Controller, Post, Body } from '@nestjs/common';
import { AlertService } from './alerts.service';

@Controller('alert')
export class AlertController {
  constructor(private readonly alertService: AlertService) {}

  @Post()
  async createAlert(
    @Body('email') email: string,
    @Body('chain') chain: string,
    @Body('thresholdPrice') thresholdPrice: number,
  ) {
    return this.alertService.createAlert(email, chain, thresholdPrice);
  }
}
