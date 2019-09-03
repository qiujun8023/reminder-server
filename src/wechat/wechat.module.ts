import { Module } from '@nestjs/common';
import { WechatService } from './wechat.service';

@Module({
  imports: [],
  providers: [WechatService],
})
export class WechatModule {}
