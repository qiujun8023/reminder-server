import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { WechatModule } from './wechat/wechat.module';
import { ReminderModule } from './reminder/reminder.module';

@Module({
  imports: [ConfigModule, WechatModule, ReminderModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
