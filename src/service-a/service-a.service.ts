import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { once } from 'events';
import Redis from 'ioredis';
import { ERROR_MESSAGES } from 'src/common/constants';
import { createRedisClient } from 'src/common/redis-client';

interface DoubleResponse {
  result: number;
}

@Injectable()
export class ServiceAService {
  private readonly publisher: Redis;

  constructor() {
    this.publisher = createRedisClient();
  }

  async getDouble(numParam: number): Promise<number> {
    const num = Number(numParam);
    if (isNaN(num)) {
      throw new BadRequestException(ERROR_MESSAGES.INVALID_NUMBER);
    }

    const requestId = uuidv4();
    const responseChannel = `response_${requestId}`;

    const tempSub = createRedisClient();

    try {
      await tempSub.subscribe(responseChannel);

      await this.publisher.publish(
        'double_number',
        JSON.stringify({ id: requestId, data: num }),
      );

      const result = await Promise.race([
        once(tempSub as any, 'message') as Promise<[string, string]>,
        this.timeout(1500),
      ]);

      const [channel, message] = result;

      if (channel !== responseChannel) {
        throw new InternalServerErrorException(
          ERROR_MESSAGES.UNEXPECTED_CHANNEL,
        );
      }

      const data = JSON.parse(message) as DoubleResponse;

      if (typeof data.result !== 'number') {
        throw new InternalServerErrorException(ERROR_MESSAGES.INVALID_RESPONSE);
      }

      return data.result;
    } finally {
      await tempSub.unsubscribe(responseChannel);
      await tempSub.quit();
    }
  }

  private timeout(ms: number): Promise<never> {
    return new Promise((_, reject) =>
      setTimeout(
        () => reject(new InternalServerErrorException(ERROR_MESSAGES.TIMEOUT)),
        ms,
      ),
    );
  }
}
