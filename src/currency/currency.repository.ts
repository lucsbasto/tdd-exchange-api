import { Injectable, InternalServerErrorException } from "@nestjs/common"
import { validateOrReject } from "class-validator"
import { Entity, EntityRepository, Repository } from "typeorm"
import { Currency } from "./currency.entity"
import { CurrencyInput } from "./types/currency-input.types"
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

  async createCurrency(currency: CurrencyInput): Promise<Currency> {
    const createdCurrency = new Currency()
    createdCurrency.currency = currency.currency;
    createdCurrency.value = currency.value;
    try {
      await validateOrReject(createdCurrency)
      return this.save(createdCurrency)
    } catch (error) { 
      throw new InternalServerErrorException()
    }
  }

  async updateCurrency(currency: CurrencyInput): Promise<Currency> {
    return new Currency()
  }
}