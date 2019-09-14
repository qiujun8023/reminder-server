import * as url from 'url';
import { Response, Request } from 'express';
import { Controller, Get, Query, Inject, Res, Req } from '@nestjs/common';
import { ApiUseTags, ApiResponse } from '@nestjs/swagger';
import { SWAGGER_TAG_WECHAT } from '../common/constants';
import { ConfigService } from '../common/service/config.service';
import { WechatService } from './wechat.service';
import { WechatOAuthCallbackDTO } from './dto/wechat-oauth-callback.dto';
import { WechatOAuth } from './dto/wechat-oauth.dto';

@Controller('/wechat')
@ApiUseTags(SWAGGER_TAG_WECHAT)
export class WechatController {
  @Inject()
  private configService: ConfigService;

  @Inject()
  private wechatService: WechatService;

  @Get('/oauth')
  @ApiResponse({ status: 302 })
  public async oauth(@Query() query: WechatOAuth, @Res() res: Response) {
    const uri = new url.URL('/api/wechat/oauth/callback', this.configService.server.baseURL);

    const search = new url.URLSearchParams();
    search.set('redirect', query.redirect || '/');

    uri.search = search.toString();

    res.redirect(this.wechatService.oauth.getOAuthURL(uri.href));
  }

  @Get('/oauth/callback')
  @ApiResponse({ status: 302})
  public async oauthCallback(@Query() query: WechatOAuthCallbackDTO, @Req() req: Request, @Res() res: Response) {
    const oauthUser = await this.wechatService.oauth.getUserByCode(query.code);

    req.session.user = {
      userId: oauthUser.UserId,
    };

    res.redirect(query.redirect || '/');
  }
}
