import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';
import { ServerConfig } from './config/interfaces/server-config.interface';
import { PackageConfig } from './config/interfaces/package-config.interface';
import {
  API_BASE_PATH,
  SWAGGER_TAG_WECHAT,
  SWAGGER_TAG_REMINDER,
} from './common/constants';

async function bootstrap() {
  const logger: Logger = new Logger('Bootstrap', true);

  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const packageConfig: PackageConfig = configService.package;
  const serverConfig: ServerConfig = configService.server;

  app.setGlobalPrefix(API_BASE_PATH);

  const options = new DocumentBuilder()
    .setTitle(packageConfig.name)
    .setDescription(packageConfig.description)
    .setVersion(packageConfig.version)
    .setBasePath(API_BASE_PATH)
    .addTag(SWAGGER_TAG_WECHAT)
    .addTag(SWAGGER_TAG_REMINDER)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(API_BASE_PATH, app, document);

  await app.listen(serverConfig.port, serverConfig.host);

  logger.log(`Nest Started at ${serverConfig.baseUrl}`);
}
bootstrap();
