import { InternalServerErrorException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing"
import { Currency } from "src/currency/currency.entity";
import { CurrencyRepository } from "src/currency/currency.repository"

describe('CurrencyRepository', () => {
  let repository;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers:  [CurrencyRepository]
    }).compile()
    repository = module.get<CurrencyRepository>(CurrencyRepository)
  });

  it('should be defined', () => {
    expect(repository).toBeDefined()
  });

  describe('getCurrency()', () => {
    it('should call findOne with corrects params', async () => {
      repository.findOne = jest.fn().mockReturnValue({})
      await repository.getCurrency('USD');
      expect(repository.findOne).toBeCalledWith({currency: 'USD'})
    });

    it('should throw if findOne return undefined', async () => {
      repository.findOne = jest.fn().mockReturnValue(undefined)
      await expect(repository.getCurrency('USD')).rejects.toThrow(new InternalServerErrorException())
    });

    it('should return what findOne returns', async () => {
      const mockData = {currency: 'USD', value: 1} as Currency
      repository.findOne = jest.fn().mockReturnValue(mockData)
      expect(await repository.getCurrency('USD')).toEqual(mockData)
    });
  });
})
