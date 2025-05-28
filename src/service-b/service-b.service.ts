import { Injectable } from '@nestjs/common';

@Injectable()
export class ServiceBService {
  calculateDouble(value: number): number {
    return value * 2;
  }

  calculateSquare(value: number): number {
    return value * value;
  }
}
