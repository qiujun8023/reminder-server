import * as fs from 'fs';
import * as path from 'path';
import * as nodeConfig from 'config';
import { Injectable } from '@nestjs/common';
import { Config } from './interfaces/config.interface';
import { ServerConfig } from './interfaces/server-config.interface';
import { LoggerConfig } from './interfaces/logger-config.interface';
import { MySQLConfig } from './interfaces/mysql-config.interface';
import { WechatConfig } from './interfaces/wechat-config.interface';
import { PackageConfig } from './interfaces/package-config.interface';

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
