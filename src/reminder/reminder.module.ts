import { Module } from '@nestjs/common';
import { ReminderController } from './reminder.controller';

@Module({
  controllers: [ReminderController],
  providers: [],
})
export class ReminderModule {}
