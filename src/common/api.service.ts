import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiService {
  constructor(private configService: ConfigService) {}

  async getEthPrice(): Promise<number> {
    const response = await axios.get(
      `${this.configService.get('MORALIS_API_URL')}/erc20/eth/price`,
      {
        headers: { 'X-API-Key': this.configService.get('MORALIS_API_KEY') },
      },
    );
    return response.data.usdPrice;
  }

  async getPolygonPrice(): Promise<number> {
    const response = await axios.get(
      `${this.configService.get('MORALIS_API_URL')}/erc20/polygon/price`,
      {
        headers: { 'X-API-Key': this.configService.get('MORALIS_API_KEY') },
      },
    );
    return response.data.usdPrice;
  }

  async getEthToBtcRate(): Promise<number> {
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price?ids=ethereum,bitcoin&vs_currencies=btc',
    );
    return response.data.ethereum.btc;
  }
}
