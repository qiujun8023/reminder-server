import { Controller, Get, Logger } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { SWAGGER_TAG_REMINDER } from '../common/constants';

@Controller('/')
@ApiUseTags(SWAGGER_TAG_REMINDER)
export class ReminderController {
  private logger: Logger = new Logger('ReminderController');

  @Get()
  public hello(): string {
    this.logger.log('Hello World');
    return 'Hello World';
  }
}
