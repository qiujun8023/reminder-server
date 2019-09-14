import { ApiModelProperty } from '@nestjs/swagger';

export class WechatOAuthCallbackDTO {
  @ApiModelProperty()
  code: string;

  @ApiModelProperty()
  state: string;

  @ApiModelProperty()
  redirect: string;
}
