import { InternalServerErrorException, NotFoundException } from "@nestjs/common"
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

  async deleteCurrency(currency: string): Promise<String> {
    const result = await this.findOne({currency});
    if(!result){
      throw new NotFoundException(`The currency ${currency} not found.`)
    }
    try {
      await this.delete(result)
      return "Currency deleted"
    } catch (error) { 
      throw new InternalServerErrorException()
    }
  }

  async createCurrency(currencyInput: CurrencyInput): Promise<Currency> {
    const createdCurrency = new Currency()
    createdCurrency.currency = currencyInput.currency;
    createdCurrency.value = currencyInput.value;
    try {
      await validateOrReject(createdCurrency)
      return this.save(createdCurrency)
    } catch (error) { 
      throw new InternalServerErrorException()
    }
  }

  async updateCurrency({currency, value}: CurrencyInput): Promise<Currency> {
    const result = await this.findOne({currency});
    if(!result){
      throw new NotFoundException(`The currency ${currency} not found.`)
    }
    try {
      result.value = value
      await this.save(result)
      return result
    } catch (error) { 
      throw new InternalServerErrorException()
    }
  }
}