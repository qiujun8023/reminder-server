import * as fs from 'fs';
import * as path from 'path';
import * as nodeConfig from 'config';
import { Injectable } from '@nestjs/common';
import { Config } from '../interface/config.interface';
import { LoggerConfig } from '../interface/logger-config.interface';
import { MySQLConfig } from '../interface/mysql-config.interface';
import { PackageConfig } from '../interface/package-config.interface';
import { RedisConfig } from '../interface/redis-config.interface';
import { ServerConfig } from '../interface/server-config.interface';
import { WechatConfig } from '../interface/wechat-config.interface';

@Injectable()
export class ConfigService {
  private config: Config;

  constructor() {
    this.config = {
      env: nodeConfig.get('env'),
      debug: Boolean(nodeConfig.get('debug')),
      package: this.getPackageConfig(),
      server: nodeConfig.get('server'),
      logger: nodeConfig.get('logger'),
      mysql: nodeConfig.get('mysql'),
      redis: nodeConfig.get('redis'),
      wechat: nodeConfig.get('wechat'),
    };
  }

  get env(): string {
    return this.config.env;
  }

  get debug(): boolean {
    return this.config.debug;
  }

  get package(): PackageConfig {
    return this.config.package;
  }

  get server(): ServerConfig {
    return this.config.server;
  }

  get logger(): LoggerConfig {
    return this.config.logger;
  }

  get redis(): RedisConfig {
    return this.config.redis;
  }

  get mysql(): MySQLConfig {
    return this.config.mysql;
  }

  get wechat(): WechatConfig {
    return this.config.wechat;
  }

  private getPackageConfig(): PackageConfig {
    const pkgPath = path.join(process.cwd(), 'package.json');
    const pkgContent = fs.readFileSync(pkgPath, 'utf-8');
    const pkg = JSON.parse(pkgContent);
    return {
      name: pkg.name,
      description: pkg.description,
      version: pkg.version,
    };
  }
}
