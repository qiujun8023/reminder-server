import { HttpModule, Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { WechatService } from './wechat.service';

@Module({
  imports: [CommonModule, HttpModule],
  providers: [WechatService],
})
export class WechatModule {}
