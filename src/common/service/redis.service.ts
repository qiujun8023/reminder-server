import { Injectable } from '@nestjs/common';
import * as IORedis from 'ioredis';
import { ConfigService } from '../service/config.service';

@Injectable()
export class RedisService extends IORedis {
  constructor(configService: ConfigService) {
    super(configService.redis);
  }
}
