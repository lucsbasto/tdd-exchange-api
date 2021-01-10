import { Module } from '@nestjs/common';
import { CurrencyService } from 'src/currency/currency.service';
import { ExchangeService } from './exchange.service';

@Module({
  providers: [ExchangeService, CurrencyService]
})
export class ExchangeModule { }
