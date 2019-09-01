import { Controller, Get, Logger } from '@nestjs/common';

@Controller('/')
export class ReminderController {
  private logger: Logger = new Logger('ReminderController');

  @Get()
  public hello(): string {
    this.logger.log('Hello World');
    return 'Hello World';
  }
}
