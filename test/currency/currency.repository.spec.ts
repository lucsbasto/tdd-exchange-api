import { InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing"
import { Currency } from "src/currency/currency.entity";
import { CurrencyRepository } from "src/currency/currency.repository"

describe('CurrencyRepository', () => {
  let repository;
  let mockData: Currency;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers:  [CurrencyRepository]
    }).compile()
    repository = module.get<CurrencyRepository>(CurrencyRepository)
    repository.save = jest.fn()
    mockData = {currency: 'USD', value: 1} as Currency
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
      repository.findOne = jest.fn().mockReturnValue(mockData)
      expect(await repository.getCurrency('USD')).toEqual(mockData)
    });
  });

  describe('createCurrency()', () => {
    beforeEach(() => {
      repository.save = jest.fn()
    })
    it('should call save with corrects params', async () => {
      repository.save = jest.fn().mockReturnValue(mockData)
      await repository.createCurrency(mockData);
      expect(repository.save).toBeCalledWith(mockData)
    });

    it('should throw when save throw', async () => {
      repository.save = jest.fn().mockRejectedValue(new InternalServerErrorException)
      await expect(repository.createCurrency(mockData)).rejects.toThrowError(new InternalServerErrorException());
    });

    it('should not throw if save not throw', async () => {
      repository.save = jest.fn().mockReturnValue(mockData)
      await expect(repository.createCurrency(mockData)).resolves.not.toThrow();
    });

    it('should return a created data', async () => {
      repository.save = jest.fn().mockReturnValue(mockData)
      expect(await repository.createCurrency(mockData)).toEqual(mockData);
    });

    it('should not throw if called with invalid params', async () => {
      mockData.currency = 'INVALID';
      await expect(repository.createCurrency(mockData)).rejects.toThrowError(new InternalServerErrorException());
    });
  });
  describe('updateCurrency()', () => {
    it('should call findOne with corrects params', async () => {
      repository.findOne = jest.fn().mockReturnValue(mockData)
      await repository.updateCurrency(mockData);
      expect(repository.findOne).toBeCalledWith({currency: 'USD'})
    });
    it('should throw if findOne return undefined', async () => {
      repository.findOne = jest.fn().mockReturnValue(undefined)
      await expect(repository.updateCurrency(mockData)).rejects
      .toThrow(new NotFoundException(`The currency ${mockData.currency} not found.`))
    });

    it('should call save with corrects params', async () => {
      repository.findOne = jest.fn().mockReturnValue(mockData)
      repository.save = jest.fn().mockReturnValue(mockData)
      await repository.updateCurrency(mockData);
      expect(repository.save).toBeCalledWith(mockData)
    });

    it('should throw if save throw', async () => {
      repository.findOne = jest.fn().mockReturnValue(mockData)
      repository.save = jest.fn().mockRejectedValue(mockData)
      await expect(repository.updateCurrency(mockData)).rejects.toThrow();
    });

    it('should be returned updated data', async () => {
      repository.findOne = jest.fn().mockReturnValue({currency: 'USD', value: 1})
      repository.save = jest.fn().mockReturnValue(mockData)
      const result = await repository.updateCurrency({currency: 'USD', value: 2})
      expect(result).toEqual({currency: 'USD', value: 2});
    });
  })
  
})
