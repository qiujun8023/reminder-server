import { HttpModule, Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { AccessTokenService } from './kernel/base/access-token.service';
import { HTTPClientService } from './kernel/base/http-client.service';
import { OAuthService } from './kernel/oauth/oauth.service';
import { WechatService } from './wechat.service';
import { WechatController } from './wechat.controller';

@Module({
  imports: [CommonModule, HttpModule],
  providers: [
    AccessTokenService,
    HTTPClientService,
    OAuthService,
    WechatService,
  ],
  controllers: [WechatController],
})
export class WechatModule {}
