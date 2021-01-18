import { Injectable, InternalServerErrorException } from "@nestjs/common"
import { Entity, EntityRepository, Repository } from "typeorm"
import { Currency } from "./currency.entity"
@EntityRepository(Currency)
export class CurrencyRepository extends Repository<Currency>{
  async getCurrency(currency: string): Promise<Currency> {
    const result = await this.findOne({currency})
    if(!result){
      throw new InternalServerErrorException()
    }
    return result
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