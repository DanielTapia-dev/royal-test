import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { ServiceAService } from './service-a.service';

describe('ServiceAService', () => {
  let service: ServiceAService;

  const mockClient = {
    send: jest.fn(() => of(99)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ServiceAService,
        {
          provide: 'REDIS_CLIENT',
          useValue: mockClient,
        },
      ],
    }).compile();

    service = module.get<ServiceAService>(ServiceAService);
  });

  it('should return double value from redis', async () => {
    const result = await service.getDouble(11);
    expect(result).toBe(99);
  });
});
