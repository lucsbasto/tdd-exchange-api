import { InternalServerErrorException } from '@nestjs/common';
import {Test, TestingModule} from '@nestjs/testing'
import {CurrencyRepository, CurrencyService} from '../../src/currency/currency.service'
describe('ExchangeService', () => {
  let service: CurrencyService;
  let repository: CurrencyRepository;
  const repositoryMock = {getCurrency: jest.fn()}
  beforeEach(async () => {
    jest.resetAllMocks()
    const module: TestingModule = await Test.createTestingModule({
      providers: [CurrencyService, {provide: CurrencyRepository, useValue: repositoryMock}],
    }).compile();
    service = module.get<CurrencyService>(CurrencyService)
    repository = module.get<CurrencyRepository>(CurrencyRepository)
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
  });

});