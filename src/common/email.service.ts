import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get('EMAIL_HOST'),
      port: +this.configService.get('EMAIL_PORT'),
      auth: {
        user: this.configService.get('EMAIL_USER'),
        pass: this.configService.get('EMAIL_PASS'),
      },
    });
  }

  async sendPriceAlert(email: string, chain: string, price: number) {
    await this.transporter.sendMail({
      from: `"Price Alert" <${this.configService.get('EMAIL_USER')}>`,
      to: email,
      subject: `Price Alert for ${chain}`,
      text: `${chain} price has reached $${price}`,
    });
  }
}
