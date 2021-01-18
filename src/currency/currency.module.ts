import { Module } from '@nestjs/common';
import { CurrencyRepository, CurrencyService } from './currency.service';

@Module({
  providers: [CurrencyService, CurrencyRepository]
})
export class CurrencyModule {}
