import { HttpService, Inject, Injectable } from '@nestjs/common';
import { AccessTokenService } from './access-token.service';
import { AxiosRequestConfig } from 'axios';
import { ResponseDTO } from './dto/response.dto';

@Injectable()
export class HTTPClientService {
  @Inject()
  private readonly instance: HttpService;

  @Inject()
  private readonly accessTokenService: AccessTokenService;

  protected readonly baseUrl: string = 'https://qyapi.weixin.qq.com/';

  public async request<T extends ResponseDTO>(
    config: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.instance.request<T>(config).toPromise();
    return response.data;
  }

  public async requestWithAccessToken<T extends ResponseDTO>(
    config: AxiosRequestConfig,
  ): Promise<T> {
    const accessToken = await this.accessTokenService.getAccessToken();
    return this.request<T>(
      Object.assign(
        {
          params: {
            access_token: accessToken.access_token,
          },
        },
        config,
      ),
    );
  }
}
