import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { WechatModule } from './wechat/wechat.module';
import { ReminderModule } from './reminder/reminder.module';

@Module({
  imports: [CommonModule, WechatModule, ReminderModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
