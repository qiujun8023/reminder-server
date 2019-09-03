import { Controller, Get, Logger, Inject, Req } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { SWAGGER_TAG_REMINDER } from '../common/constants';
import { RedisService } from '../common/service/redis.service';
import { Request } from 'express';

@Controller('/')
@ApiUseTags(SWAGGER_TAG_REMINDER)
export class ReminderController {
  private logger: Logger = new Logger('ReminderController');

  @Inject()
  private redis: RedisService;

  @Get('/hello')
  public async hello(@Req() request: Request): Promise<string> {
    request.session.user = 123;
    await this.redis.set('a', '123');
    this.logger.log(await this.redis.get('a'));
    return 'Hello World';
  }
}
