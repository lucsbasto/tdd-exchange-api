import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CurrencyService } from 'src/currency/currency.service';
import { ExchangeInputType } from 'src/exchange/types/exchange-input.types';
import { ExchangeService } from './../../src/exchange/exchange.service';

describe('ExchangeService', () => {
  let service: ExchangeService;
  let currencyService: CurrencyService;
  let mockData: ExchangeInputType;
  beforeEach(async () => {
    jest.resetAllMocks()
    const currencyMock = { getCurrency: jest.fn().mockResolvedValue({ value: 1 }) }
    const module: TestingModule = await Test.createTestingModule({
      providers: [{ provide: CurrencyService, useValue: currencyMock },
        ExchangeService
      ],
    }).compile();

    service = module.get<ExchangeService>(ExchangeService);
    currencyService = module.get<CurrencyService>(CurrencyService);
    mockData = { from: 'USD', to: 'BRL', amount: 1 }
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be throw an error when call with invalid params', async () => {
    mockData.from = ''
    mockData.to = ''
    await expect(
      service.convertAmount(mockData)
    ).rejects.toThrow()
  });

  it('should not throw an error when call with valid params', async () => {
    await expect(
      service.convertAmount(mockData)
    ).resolves.not.toThrow()
  });

  it('should be throw an BadRequestException when call with invalid params', async () => {
    mockData.from = ''
    mockData.to = ''
    await expect(
      service.convertAmount(mockData)
    ).rejects.toThrow(new BadRequestException())

    mockData.from = 'USD'
    mockData.to = ''
    await expect(
      service.convertAmount(mockData)
    ).rejects.toThrow(new BadRequestException())
    
    mockData.from = ''
    mockData.to = 'USD'
    await expect(
      service.convertAmount(mockData)
    ).rejects.toThrow(new BadRequestException())
  });

  it('should call getCurrency with correct params', async () => {
    mockData.from = 'USD'
    mockData.to = 'BRL'
    mockData.amount = 5
    await service.convertAmount(mockData);
    expect(currencyService.getCurrency).toHaveBeenNthCalledWith(1, 'USD');
    expect(currencyService.getCurrency).toHaveBeenLastCalledWith('BRL');
  });

  it('should be throw when pass an invalid currency', async () => {
    mockData.from = 'INVALID';
    mockData.to = 'BRL';
    mockData.amount = 5;
    (currencyService.getCurrency as jest.Mock).mockRejectedValue(new Error());
    await expect(service.convertAmount(mockData)).rejects.toThrow();
  });

  it('should be called getCurrency twice', async () => {
    await service.convertAmount(mockData);
    expect(currencyService.getCurrency).toBeCalledTimes(2);
  });

  it('should be return conversion value', async () => {
    (currencyService.getCurrency as jest.Mock).mockResolvedValueOnce({ value: 1 });
    (currencyService.getCurrency as jest.Mock).mockResolvedValueOnce({ value: 0.2 });
    expect(await service.convertAmount(mockData)).toEqual({ amount: 5 });

    mockData.from = 'BRL';
    mockData.to = 'USD';
    mockData.amount = 1;
    (currencyService.getCurrency as jest.Mock).mockResolvedValueOnce({ value: 0.2 });
    (currencyService.getCurrency as jest.Mock).mockResolvedValueOnce({ value: 1 });
    expect(await service.convertAmount(mockData)).toEqual({ amount: 0.2 });

    mockData.from = 'BRL';
    mockData.to = 'BRL';
    mockData.amount = 1;
    (currencyService.getCurrency as jest.Mock).mockResolvedValueOnce({ value: 1 });
    (currencyService.getCurrency as jest.Mock).mockResolvedValueOnce({ value: 1 });
    expect(await service.convertAmount(mockData)).toEqual({ amount: 1 });
  });

});