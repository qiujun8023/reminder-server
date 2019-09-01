import { LoggerConfig } from './logger-config.interface';
import { ServerConfig } from './server-config.interface';
import { MySQLConfig } from './mysql-config.interface';
import { WechatConfig } from './wechat-config.interface';

export interface Config {
  env: string;
  debug: boolean;
  version: string;
  server: ServerConfig;
  logger: LoggerConfig;
  mysql: MySQLConfig;
  wechat: WechatConfig;
}
