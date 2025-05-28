import { ServiceBService } from '../service-b/service-b.service';

describe('ServiceBService', () => {
  let service: ServiceBService;

  beforeEach(() => {
    service = new ServiceBService();
  });

  it('should calculate double', () => {
    expect(service.calculateDouble(5)).toBe(10);
  });

  it('should calculate square', () => {
    expect(service.calculateSquare(5)).toBe(25);
  });
});
