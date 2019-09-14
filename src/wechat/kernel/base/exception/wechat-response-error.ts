export class WechatResponseError extends Error {
  constructor(public errcode: number, public errmsg: string) {
    super(errmsg);
  }
}
