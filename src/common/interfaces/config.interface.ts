import { PackageConfig } from './package-config.interface';
import { ServerConfig } from './server-config.interface';
import { LoggerConfig } from './logger-config.interface';
import { MySQLConfig } from './mysql-config.interface';
import { WechatConfig } from './wechat-config.interface';
import { RedisConfig } from './redis-config.interface';

export interface Config {
  env: string;
  debug: boolean;
  package: PackageConfig;
  server: ServerConfig;
  logger: LoggerConfig;
  mysql: MySQLConfig;
  redis: RedisConfig;
  wechat: WechatConfig;
}
