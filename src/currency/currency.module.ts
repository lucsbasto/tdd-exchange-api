import { Module } from '@nestjs/common';
import { CurrencyRepository } from './currency.repository';
import { CurrencyService } from './currency.service';

@Module({
  providers: [CurrencyService, CurrencyRepository]
})
export class CurrencyModule {}
