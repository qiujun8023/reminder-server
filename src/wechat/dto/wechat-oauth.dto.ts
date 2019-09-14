import { ApiModelProperty } from '@nestjs/swagger';

export class WechatOAuth {
  @ApiModelProperty()
  redirect: string;
}
