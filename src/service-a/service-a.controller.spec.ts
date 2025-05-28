import { Test, TestingModule } from '@nestjs/testing';
import { ServiceAController } from './service-a.controller';
import { ServiceAService } from './service-a.service';

describe('ServiceAController', () => {
  let controller: ServiceAController;
  let getDoubleMock: jest.Mock;

  beforeEach(async () => {
    getDoubleMock = jest.fn().mockResolvedValue(10);

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceAController],
      providers: [
        {
          provide: ServiceAService,
          useValue: {
            getDouble: getDoubleMock,
          },
        },
      ],
    }).compile();

    controller = module.get<ServiceAController>(ServiceAController);
  });

  it('should return the doubled number', async () => {
    const result = await controller.getDouble(5);
    expect(result).toEqual({ result: 10 });
    expect(getDoubleMock).toHaveBeenCalledWith(5);
  });
});
