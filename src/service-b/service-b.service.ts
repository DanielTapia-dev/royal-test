import { Injectable } from '@nestjs/common';
import { ERROR_MESSAGE } from 'src/common/constants';

@Injectable()
export class ServiceBService {
  calculateDouble(value: number): number {
    if (isNaN(value)) {
      throw new Error(ERROR_MESSAGE.INVALID_NUMBER);
    }

    return value * 2;
  }

  calculateSquare(value: number): number {
    if (isNaN(value)) {
      throw new Error(ERROR_MESSAGE.INVALID_NUMBER);
    }

    return value * value;
  }
}
