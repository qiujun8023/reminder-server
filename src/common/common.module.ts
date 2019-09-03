import { Module, Global } from '@nestjs/common';
import { ConfigService } from './service/config.service';
import { RedisService } from './service/redis.service';

@Global()
@Module({
  imports: [],
  providers: [ConfigService, RedisService],
  exports: [ConfigService, RedisService],
})
export class CommonModule {}
