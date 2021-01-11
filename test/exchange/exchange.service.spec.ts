import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CurrencyService } from 'src/currency/currency.service';
import { ExchangeService } from './../../src/exchange/exchange.service';

describe('ExchangeService', () => {
  let service: ExchangeService;
  let currencyService: CurrencyService;
  let mockData = { from: 'USD', to: 'BRL', amount: 1 };
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

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be throw an error when call with invalid params', async () => {
    await expect(
      service.convertAmount({ from: '', to: '', amount: '' })
    ).rejects.toThrow()
  });

  it('should not throw an error when call with valid params', async () => {
    await expect(
      service.convertAmount({ from: 'USD', to: 'BRL', amount: 5 })
    ).resolves.not.toThrow()
  });

  it('should be throw an BadRequestException when call with invalid params', async () => {
    await expect(
      service.convertAmount({ from: '', to: '', amount: '' })
    ).rejects.toThrow(new BadRequestException())
  });

  it('should call getCurrency with correct params', async () => {
    await service.convertAmount({ from: 'USD', to: 'BRL', amount: 5 });
    expect(currencyService.getCurrency).toHaveBeenNthCalledWith(1, 'USD');
    expect(currencyService.getCurrency).toHaveBeenLastCalledWith('BRL');
  });

  it('should be throw when pass an invalid currency', async () => {
    (currencyService.getCurrency as jest.Mock).mockRejectedValue(new Error());
    await expect(service.convertAmount({ from: 'INVALID', to: 'BRL', amount: 5 })).rejects.toThrow();
  });

  it('should be called getCurrency twice', async () => {
    await service.convertAmount({ from: 'USD', to: 'BRL', amount: 1 });
    expect(currencyService.getCurrency).toBeCalledTimes(2);
  });

  it('should be return conversion value', async () => {
    (currencyService.getCurrency as jest.Mock).mockResolvedValueOnce({ value: 1 });
    (currencyService.getCurrency as jest.Mock).mockResolvedValueOnce({ value: 0.2 });
    expect(await service.convertAmount({ from: 'USD', to: 'BRL', amount: 1 })).toEqual({ amount: 5 });

    (currencyService.getCurrency as jest.Mock).mockResolvedValueOnce({ value: 0.2 });
    (currencyService.getCurrency as jest.Mock).mockResolvedValueOnce({ value: 1 });
    expect(await service.convertAmount({ from: 'BRL', to: 'USD', amount: 1 })).toEqual({ amount: 0.2 });
  });

});