import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alert } from './alerts.entity';
import { AlertService } from './alerts.service';
import { AlertController } from './alerts.controller';
import { EmailService } from '../common/email.service';
import { ApiService } from '../common/api.service';

@Module({
  imports: [TypeOrmModule.forFeature([Alert])],
  providers: [AlertService, EmailService, ApiService],
  controllers: [AlertController],
})
export class AlertModule {}
