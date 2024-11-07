import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Price } from './prices.entity';
import { PriceService } from './prices.service';
import { PriceController } from './prices.controller';
import { ApiService } from '../common/api.service';

@Module({
  imports: [TypeOrmModule.forFeature([Price])],
  providers: [PriceService, ApiService],
  controllers: [PriceController],
})
export class PriceModule {}
