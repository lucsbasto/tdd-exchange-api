import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExchangeModule } from './exchange/exchange.module';
import { CurrencyModule } from './currency/currency.module';

@Module({
  imports: [ExchangeModule, CurrencyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
