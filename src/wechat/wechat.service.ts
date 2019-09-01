import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '../config/config.service';

@Injectable()
export class WechatService {
  @Inject()
  private configService: ConfigService;
}
