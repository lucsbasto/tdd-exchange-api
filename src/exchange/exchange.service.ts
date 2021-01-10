import { BadRequestException, Injectable } from '@nestjs/common';
import { CurrencyService } from 'src/currency/currency.service';

@Injectable()
export class ExchangeService {
  constructor(private readonly currencyService: CurrencyService) { }
  async convertAmount({ from, to, amount }): Promise<any> {
    if (!from || !to || !amount) {
      throw new BadRequestException()
    }
    const currencyFrom = this.currencyService.getCurrency(from);
    const currencyTo = this.currencyService.getCurrency(to);
  }
}
