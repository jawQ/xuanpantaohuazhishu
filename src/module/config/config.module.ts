import { Module, Global } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ConfigModule as ConfigModuleSource } from '@nestjs/config';

const envFilePath = __dirname + `/../../../env/${process.env.NODE_ENV || 'development'}.env`;
// 启用webpack时适用：
// const envFilePath = __dirname + `./env/${process.env.NODE_ENV || 'development'}.env`;

@Global()
@Module({
  providers: [
    // new ConfigService(envFilePath)
    {
      provide: ConfigService,
      // 刚刚的ConfigService要传入.env路径及文件名
      useValue: new ConfigService(envFilePath),
      // useValue: new ConfigService([envFilePath]),
    },
  ],
  exports: [ConfigService]
})
export class ConfigModule extends ConfigModuleSource {
  constructor() {
    super()
    console.log('自定义 ConfigModule constructor...', envFilePath)
  }
}
