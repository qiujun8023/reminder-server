import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CommonModule } from './common/common.module';
import { WechatModule } from './wechat/wechat.module';
import { ReminderModule } from './reminder/reminder.module';
import { ConfigService } from './common/service/config.service';
import { TypeOrmNamingStrategy } from './common/strategy/typeorm-naming.strategy';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [CommonModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        ...configService.mysql,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        namingStrategy: new TypeOrmNamingStrategy(),
        synchronize: true,
      } as TypeOrmModuleOptions),
      inject: [ConfigService],
    }),
    CommonModule,
    WechatModule,
    ReminderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
