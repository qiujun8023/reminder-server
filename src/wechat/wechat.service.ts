import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '../common/service/config.service';
import { OAuthService } from './kernel/oauth/oauth.service';

@Injectable()
export class WechatService {
  @Inject()
  private configService: ConfigService;

  @Inject()
  public oauth: OAuthService;
}
