import { BadRequestException, Injectable } from '@nestjs/common';
import { CurrencyService } from 'src/currency/currency.service';

@Injectable()
export class ExchangeService {
  constructor(private readonly currencyService: CurrencyService) { }
  async convertAmount({ from, to, amount }): Promise<any> {
    if (!from || !to || !amount) {
      throw new BadRequestException()
    }
    try {
      const currencyFrom = await this.currencyService.getCurrency(from);
      const currencyTo = await this.currencyService.getCurrency(to);

      return { amount: currencyTo.value }
    }
    catch (error) {
      throw new Error(error)
    }
  }
}