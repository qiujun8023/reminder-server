import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as expressRedis from 'connect-redis';
import * as cookieParser from 'cookie-parser';
import * as expressSession from 'express-session';
import { AppModule } from './app.module';
import {
  API_BASE_PATH,
  SWAGGER_TAG_REMINDER,
  SWAGGER_TAG_WECHAT,
} from './common/constants';
import { PackageConfig } from './common/interface/package-config.interface';
import { ServerConfig } from './common/interface/server-config.interface';
import { ConfigService } from './common/service/config.service';
import { RedisService } from './common/service/redis.service';

async function bootstrap() {
  const logger: Logger = new Logger('Bootstrap', true);

  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const redisClient = app.get(RedisService);

  app.setGlobalPrefix(API_BASE_PATH);

  // swagger
  const packageConfig: PackageConfig = configService.package;
  const serverConfig: ServerConfig = configService.server;
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

  // redis session
  const RedisStore = expressRedis(expressSession);
  app.use(cookieParser());
  app.use(
    expressSession({
      store: new RedisStore({ client: redisClient }),
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: true,
    }),
  );

  await app.listen(serverConfig.port, serverConfig.host);

  logger.log(`Nest Started at ${serverConfig.baseUrl}`);
}
bootstrap();
