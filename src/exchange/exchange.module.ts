import { Module } from '@nestjs/common';
import { CurrencyRepository } from 'src/currency/currency.repository';
import { CurrencyService } from 'src/currency/currency.service';
import { ExchangeService } from './exchange.service';

@Module({
  providers: [ExchangeService, CurrencyService, CurrencyRepository]
})
export class ExchangeModule { }
