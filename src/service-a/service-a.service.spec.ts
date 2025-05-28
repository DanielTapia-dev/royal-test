// service-a.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { ServiceAService } from './service-a.service';

jest.mock('uuid', () => ({
  v4: () => 'fixed-uuid',
}));

jest.mock('src/common/redis-client', () => ({
  createRedisClient: jest.fn(() => ({
    publish: jest.fn(),
    subscribe: jest.fn(),
    unsubscribe: jest.fn(),
    quit: jest.fn(),
    on: jest.fn(),
    connect: jest.fn().mockResolvedValue(undefined),
  })),
}));

jest.mock('events', () => ({
  once: () =>
    Promise.resolve(['response_fixed-uuid', JSON.stringify({ result: 42 })]),
}));

describe('ServiceAService', () => {
  let service: ServiceAService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceAService],
    }).compile();

    service = module.get<ServiceAService>(ServiceAService);
  });

  it('should return double value', async () => {
    const result = await service.getDouble(21);
    expect(result).toBe(42);
  });
});
