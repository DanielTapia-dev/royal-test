import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { MESSAGE_PATTERNS, ERROR_MESSAGE } from '../common/constants';

@Injectable()
export class ServiceAService {
  constructor(@Inject('REDIS_CLIENT') private readonly client: ClientProxy) {}

  async getDouble(numParam: number): Promise<number> {
    const num = Number(numParam);
    if (isNaN(num)) {
      throw new Error(ERROR_MESSAGE.INVALID_NUMBER);
    }

    return await firstValueFrom(
      this.client.send<number, number>(MESSAGE_PATTERNS.DOUBLE_NUMBER, num),
    );
  }
}
