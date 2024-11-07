import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import { Price } from './prices.entity';
import { ApiService } from '../common/api.service';

@Injectable()
export class PriceService {
  constructor(
    @InjectRepository(Price)
    private readonly priceRepository: Repository<Price>,
    private readonly apiService: ApiService,
  ) {}

  async getHourlyPrices(chain: string): Promise<Price[]> {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    return this.priceRepository.find({
      where: { chain, timestamp: MoreThan(oneDayAgo) },
      order: { timestamp: 'ASC' },
    });
  }

  async getSwapRate(ethAmount: number) {
    const ethToBtcRate = await this.apiService.getEthToBtcRate();
    const btcAmount = ethAmount * ethToBtcRate;
    const fee = ethAmount * 0.03;
    return {
      btcAmount,
      feeInEth: fee,
      feeInUsd: fee * (await this.apiService.getEthPrice()),
    };
  }

  async savePrice(chain: string, price: number) {
    const priceEntry = this.priceRepository.create({ chain, price });
    return this.priceRepository.save(priceEntry);
  }
}
