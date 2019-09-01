import * as fs from 'fs';
import * as path from 'path';
import * as nodeConfig from 'config';
import { Injectable } from '@nestjs/common';
import { Config } from './interfaces/config.interface';
import { ServerConfig } from './interfaces/server-config.interface';
import { LoggerConfig } from './interfaces/logger-config.interface';
import { MySQLConfig } from './interfaces/mysql-config.interface';
import { WechatConfig } from './interfaces/wechat-config.interface';

@Injectable()
export class ConfigService {
  private config: Config;

  constructor() {
    this.config = {
      env: nodeConfig.get('env'),
      debug: Boolean(nodeConfig.get('debug')),
      version: this.getVersion(),
      server: nodeConfig.get('server'),
      logger: nodeConfig.get('logger'),
      mysql: nodeConfig.get('mysql'),
      wechat: nodeConfig.get('wechat'),
    };
  }

  get env(): string {
    return this.config.env;
  }

  get isDebug(): boolean {
    return this.config.debug;
  }

  get server(): ServerConfig {
    return this.config.server;
  }

  get logger(): LoggerConfig {
    return this.config.logger;
  }

  get mysql(): MySQLConfig {
    return this.config.mysql;
  }

  get wechat(): WechatConfig {
    return this.config.wechat;
  }

  private getVersion(): string {
    const pkgPath = path.join(process.cwd(), 'package.json');
    const pkgContent = fs.readFileSync(pkgPath, 'utf-8');
    return JSON.parse(pkgContent).version;
  }
}
