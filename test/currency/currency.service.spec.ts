import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import {Test, TestingModule} from '@nestjs/testing'
import { Currency } from 'src/currency/currency.entity';
import { CurrencyRepository } from 'src/currency/currency.repository';
import {CurrencyService} from '../../src/currency/currency.service'
describe('CurrencyService', () => {
  let service: CurrencyService;
  let repository: CurrencyRepository;
  let mockData: Currency;

  const repositoryMock = {
    getCurrency: jest.fn(),
    createCurrency: jest.fn(),
    updateCurrency: jest.fn(),
    deleteCurrency: jest.fn(),
  }
  beforeEach(async () => {
    jest.resetAllMocks()
    const module: TestingModule = await Test.createTestingModule({
      providers: [CurrencyService, {provide: CurrencyRepository, useValue: repositoryMock}],
    }).compile();
    service = module.get<CurrencyService>(CurrencyService)
    repository = module.get<CurrencyRepository>(CurrencyRepository)
    mockData = {currency: 'USD', value: 1} as Currency;
  });

  it('should be defined', () => {
    expect(service).toBeDefined()
  });
  
  describe('getCurrency', () => {
    it('should throw if repository throw', async () => {
      (repository.getCurrency as jest.Mock).mockRejectedValue(new InternalServerErrorException())
      await expect(service.getCurrency('INVALID')).rejects.toThrow(new InternalServerErrorException());
    });

    it('should not throw if repository not throw', async () => {
      await expect(service.getCurrency('VALID')).resolves.not.toThrow();
    });

    it('should call repository with correct params', async () => {
      service.getCurrency('USD')
      await expect(repository.getCurrency).toBeCalledWith('USD');

      service.getCurrency('BRL')
      await expect(repository.getCurrency).toBeCalledWith('BRL');
    });
    it('should return when repository return', async () => {
      (repository.getCurrency as jest.Mock).mockResolvedValue(mockData)
      expect(await service.getCurrency('USD')).toEqual(mockData)
    });
  });

  describe('createCurrency', () => {
    it('should throw if repository throw', async () => {
      (repository.createCurrency as jest.Mock).mockRejectedValue(new InternalServerErrorException())
      mockData.currency = 'INVALID'
      await expect(service.createCurrency(mockData)).rejects.toThrow(new InternalServerErrorException());
    });
    it('should not throw if repository returns', async () => {
      (repository.createCurrency as jest.Mock).mockResolvedValue(mockData)
      await expect(service.createCurrency(mockData)).resolves.not.toThrow();
    });
    it('should call repository with correct params', async () => {
      service.createCurrency(mockData)
      await expect(repository.createCurrency).toBeCalledWith(mockData)
    })
    it('should be throw if value <= 0', async () => {
      mockData.value = 0
      await expect(service.createCurrency(mockData)).rejects.toThrow(
        new BadRequestException('The value must be greater than zero')
      )
    });

    it('should return when repository return', async () => {
      (repository.createCurrency as jest.Mock).mockResolvedValue(mockData)
      expect(await service.createCurrency(mockData)).toEqual(mockData)
    });
  });

  describe('updateCurrency', () => {
    it('should throw if repository throw', async () => {
      (repository.updateCurrency as jest.Mock).mockRejectedValue(new InternalServerErrorException())
      mockData.currency = 'INVALID'
      await expect(service.updateCurrency(mockData)).rejects.toThrow(new InternalServerErrorException());
    });
    it('should not throw if repository returns', async () => {
      (repository.updateCurrency as jest.Mock).mockResolvedValue(mockData)
      await expect(service.updateCurrency(mockData)).resolves.not.toThrow();
    });
    it('should call repository with correct params', async () => {
      service.updateCurrency(mockData)
      await expect(repository.updateCurrency).toBeCalledWith(mockData)
    })
    it('should be throw if value <= 0', async () => {
      mockData.value = 0
      await expect(service.updateCurrency(mockData)).rejects.toThrow(
        new BadRequestException('The value must be greater than zero')
      )
    });
    it('should return when repository return', async () => {
      (repository.updateCurrency as jest.Mock).mockResolvedValue(mockData)
      expect(await service.updateCurrency(mockData)).toEqual(mockData)
    });
    });

  describe('deleteCurrency', () => {
    it('should throw if repository throw', async () => {
      (repository.deleteCurrency as jest.Mock).mockRejectedValue(new InternalServerErrorException())
      mockData.currency = 'INVALID'
      await expect(service.deleteCurrency(mockData.currency)).rejects.toThrow(new InternalServerErrorException());
    });
    it('should not throw if repository returns true', async () => {
      (repository.deleteCurrency as jest.Mock).mockResolvedValue(true)
      await expect(service.deleteCurrency(mockData.currency)).resolves.not.toThrow();
    });
    it('should call repository with correct params', async () => {
      service.deleteCurrency(mockData.currency)
      await expect(repository.deleteCurrency).toBeCalledWith(mockData.currency)
    })
    it('should return when repository return', async () => {
      (repository.deleteCurrency as jest.Mock).mockResolvedValue(mockData.currency)
      expect(await service.deleteCurrency(mockData.currency)).toEqual(`${mockData.currency} deleted.`)
    });
    });
});