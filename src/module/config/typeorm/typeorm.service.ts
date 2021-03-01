import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { ConfigService } from 'src/module/config'


@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  // 注入config service取得env变量
  constructor(
    // private readonly configService: ConfigService
  ) {
    console.log('typeorm service constructor...')
  }
  // 就是回传TypeOrmOptions对象
  createTypeOrmOptions(): TypeOrmModuleOptions {
    // console.log('获取typeorm配置参数之前：', process.env.DB_TYPE)
    const _env = process.env
    const options:any = {
      type: _env.DB_TYPE,
      host: _env.DB_HOST,
      port: _env.DB_PORT,
      username: _env.DB_USERNAME,
      password: _env.DB_PASSWORD,
      database: _env.DB_DATABASE,
      synchronize: _env.DB_TYPEORM_SYNCHRONIZE,
      logging: _env.DB_TYPEORM_LOGGING === 'true',
      entities: [
        __dirname + '/../../../../**/*.entity.js',
      ],
      timezone: 'UTC',
    }
    // const options:any = {
    //   type: this.configService.get('DB_TYPE'),
    //   host: this.configService.get('DB_HOST'),
    //   port: Number(this.configService.get('DB_PORT')),
    //   username: this.configService.get('DB_USERNAME'),
    //   password: this.configService.get('DB_PASSWORD'),
    //   database: this.configService.get('DB_DATABASE'),
    //   synchronize: this.configService.get('DB_TYPEORM_SYNCHRONIZE') === 'true',
    //   logging: this.configService.get('DB_TYPEORM_LOGGING') === 'true',
    //   entities: [
    //     __dirname + '/../../../../**/*.entity.js',
    //   ],
    //   timezone: 'UTC'
    // }
    console.log('获取typeorm配置参数：', options.username)
    return options;
  }
}
