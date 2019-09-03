import { Module } from '@nestjs/common';
import { WechatModule } from './wechat/wechat.module';
import { ReminderModule } from './reminder/reminder.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [WechatModule, ReminderModule, CommonModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
