import * as url from 'url';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '../../../common/service/config.service';
import { HTTPClientService } from '../base/http-client.service';
import { OAuthUserDTO } from './dto/oauth-user.dto';

@Injectable()
export class OAuthService {
  @Inject()
  private readonly configService: ConfigService;

  @Inject()
  private client: HTTPClientService;

  public getOAuthURL(redirect: string, scope: string = 'snsapi_base', state: string = ''): string {
    const uri = new url.URL('https://open.weixin.qq.com/connect/oauth2/authorize#wechat_redirect');

    const search = new url.URLSearchParams();
    search.set('appid', this.configService.wechat.corpId);
    search.set('redirect_uri', redirect);
    search.set('response_type', 'code');
    search.set('scope', scope);
    search.set('state', state);

    uri.search = search.toString();
    return uri.href;
  }

  public async getUserByCode(code: string): Promise<OAuthUserDTO> {
    return this.client.requestWithAccessToken<OAuthUserDTO>({
      url: '/cgi-bin/user/getuserinfo',
      params: { code },
    });
  }
}
