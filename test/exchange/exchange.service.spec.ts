import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CurrencyService } from 'src/currency/currency.service';
import { ExchangeService } from './../../src/exchange/exchange.service';

describe('ExchangeService', () => {
  let service: ExchangeService;
  let currencyService: CurrencyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{ provide: CurrencyService, useValue: { getCurrency: jest.fn() } },
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

  it('should call getCurrency method twice', async () => {
    await service.convertAmount({ from: 'USD', to: 'BRL', amount: 5 });
    expect(currencyService.getCurrency).toBeCalledTimes(2);
  });
});
