import { Test, TestingModule } from '@nestjs/testing';
import { ServiceBController } from './service-b.controller';
import { ServiceBService } from './service-b.service';

describe('ServiceBController', () => {
  let controller: ServiceBController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceBController],
      providers: [
        {
          provide: ServiceBService,
          useValue: {
            calculateDouble: jest.fn().mockReturnValue(14),
            calculateSquare: jest.fn().mockReturnValue(49),
          },
        },
      ],
    }).compile();

    controller = module.get<ServiceBController>(ServiceBController);
  });

  it('should return doubled value from message pattern', () => {
    expect(controller.handleDouble(7)).toBe(14);
  });

  it('should return square value from route', () => {
    const result = controller.getSquare('7');
    expect(result).toEqual({ result: 49 });
  });
});
