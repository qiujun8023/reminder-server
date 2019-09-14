import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { ConfigService } from '../../../common/service/config.service';
import { RedisService } from '../../../common/service/redis.service';
import { HTTPClientService } from './http-client.service';
import { AccessTokenDTO } from './dto/access-token.dto';

@Injectable()
export class AccessTokenService {
  @Inject()
  private readonly configService: ConfigService;

  @Inject()
  private readonly redisService: RedisService;

  @Inject(forwardRef(() => HTTPClientService))
  private readonly httpClientService: HTTPClientService;

  private readonly accessTokenSafeSeconds = 500;
  private readonly accessTokenCacheKey = 'wechat:access-toekn';

  public async getAccessToken(refresh: boolean = false): Promise<AccessTokenDTO> {
    const cachedAccessTokenString = await this.redisService.get(
      this.accessTokenCacheKey,
    );
    if (!refresh && cachedAccessTokenString != null) {
      return JSON.parse(cachedAccessTokenString);
    }

    const requestedAccessToken = await this.requestToken();
    await this.setToken(requestedAccessToken);
    return requestedAccessToken;
  }

  public async refreshAccessToken(): Promise<AccessTokenDTO> {
    return this.getAccessToken(true);
  }

  public async setToken(accessToken: AccessTokenDTO): Promise<boolean> {
    const safeExpiresIn = accessToken.expires_in - this.accessTokenSafeSeconds;
    return this.redisService.setex(
      this.accessTokenCacheKey,
      safeExpiresIn,
      JSON.stringify(accessToken),
    );
  }

  public async requestToken(): Promise<AccessTokenDTO> {
    const wechatConfig = this.configService.wechat;
    return this.httpClientService.request<AccessTokenDTO>({
      method: 'get',
      url: '/cgi-bin/gettoken',
      params: {
        corpid: wechatConfig.corpId,
        corpsecret: wechatConfig.secret,
      },
    });
  }
}
