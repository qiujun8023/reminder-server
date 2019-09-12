import { ResponseDTO } from './response.dto';

export interface AccessTokenDTO extends ResponseDTO {
  access_token: string;
  expires_in: number;
}
