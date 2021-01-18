import { Injectable } from "@nestjs/common"
import { Currency } from "./currency.entity"

@Injectable()
export class CurrencyRepository {
  async getCurrency(currency: string): Promise<Currency> {
    return new Currency()
  }

  async deleteCurrency(currency: string): Promise<Boolean> {
    return true
  }

  async createCurrency(currency: Currency): Promise<Currency> {
    return new Currency()
  }

  async updateCurrency(currency: Currency): Promise<Currency> {
    return new Currency()
  }
}