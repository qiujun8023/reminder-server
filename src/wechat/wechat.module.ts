import { Module } from '@nestjs/common';
import { WechatService } from './wechat.service';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [ConfigModule],
  providers: [WechatService],
})
export class WechatModule {}
