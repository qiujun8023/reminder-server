import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { ReminderModule } from './reminder/reminder.module';
import { WechatModule } from './wechat/wechat.module';

@Module({
  imports: [WechatModule, ReminderModule, CommonModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
