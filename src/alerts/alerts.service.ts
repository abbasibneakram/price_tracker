import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Alert } from './alerts.entity';
import { EmailService } from '../common/email.service';
import { ApiService } from '../common/api.service';

@Injectable()
export class AlertService {
  constructor(
    @InjectRepository(Alert)
    private readonly alertRepository: Repository<Alert>,
    private readonly emailService: EmailService,
    private readonly apiService: ApiService,
  ) {}

  async createAlert(email: string, chain: string, thresholdPrice: number) {
    const alert = this.alertRepository.create({ email, chain, thresholdPrice });
    return this.alertRepository.save(alert);
  }

  async checkPriceAlerts() {
    const alerts = await this.alertRepository.find();
    for (const alert of alerts) {
      const currentPrice =
        alert.chain === 'ethereum'
          ? await this.apiService.getEthPrice()
          : await this.apiService.getPolygonPrice();

      if (currentPrice <= alert.thresholdPrice) {
        await this.emailService.sendPriceAlert(
          alert.email,
          alert.chain,
          currentPrice,
        );
      }
    }
  }
}
