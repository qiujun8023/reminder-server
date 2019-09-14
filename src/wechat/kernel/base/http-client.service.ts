import { HttpService, Inject, Injectable, forwardRef } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { AccessTokenService } from './access-token.service';
import { WechatResponseError } from './exception/wechat-response-error';

@Injectable()
export class HTTPClientService {
  @Inject()
  private readonly instance: HttpService;

  @Inject(forwardRef(() => AccessTokenService))
  private readonly accessTokenService: AccessTokenService;

  private readonly baseURL: string = 'https://qyapi.weixin.qq.com';

  public async request<T>(config: AxiosRequestConfig): Promise<T> {
    config = Object.assign({ baseURL: this.baseURL }, config);
    const response = await this.instance.request(config).toPromise();
    if (response.data.errcode !== 0) {
      throw new WechatResponseError(response.data.errcode, response.data.errmsg);
    }
    return response.data;
  }

  public async requestWithAccessToken<T>(
    config: AxiosRequestConfig,
    retry: boolean = true,
  ): Promise<T> {
    const accessToken = await this.accessTokenService.getAccessToken();

    if (!config.params) {
      config.params = {};
    }

    config.params.access_token = accessToken.access_token;

    try {
      return await this.request(config);
    } catch (e) {
      if (e instanceof WechatResponseError) {
        if (retry && [40014, 42001].indexOf(e.errcode) !== -1) {
          await this.accessTokenService.refreshAccessToken();
          return this.requestWithAccessToken(config, false);
        }
      }
      throw e;
    }
  }
}
