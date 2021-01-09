import { Test, TestingModule } from '@nestjs/testing';
import { ExchangeService } from './../../src/exchange/exchange.service';

describe('ExchangeService', () => {
  let service: ExchangeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExchangeService],
    }).compile();

    service = module.get<ExchangeService>(ExchangeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be throw an error when call with invalid params', async () => {
    await expect(
      service.convertAmount({ from: '', to: '', amount: '' })
    ).rejects.toThrow()
  });
});
