import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';
import { ServerConfig } from './config/interfaces/server-config.interface';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger: Logger = new Logger('Bootstrap', true);

  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const serverConfig: ServerConfig = configService.server;

  await app.listen(serverConfig.port, serverConfig.host);

  logger.log(`Nest Started at ${serverConfig.baseUrl}`);
}
bootstrap();
