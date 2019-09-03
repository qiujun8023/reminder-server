import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '../common/service/config.service';

@Injectable()
export class WechatService {
  @Inject()
  private configService: ConfigService;
}
