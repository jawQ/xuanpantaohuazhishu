import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { LifecycleModule } from 'src/module/lifecycle/lifecycle.module';
import { UserModule } from 'src/module/user/user.module';
import { AuthModule } from 'src/module/auth/auth.module';
import { ConfigModule } from 'src/module/config'
import { TypeOrmConfigService } from 'src/module/config/typeorm/typeorm.service';

const envFilePath = __dirname + `/../../../env/${process.env.NODE_ENV || 'development'}.env`;

@Module({
  imports: [
    // forRoot会将.env文件导入到环境变量供使用：
    ConfigModule.forRoot({
      envFilePath
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // ？？？该模块已设定为全局module，为何这里还要导入？？？
      useClass: TypeOrmConfigService,
      // inject: [ConfigService],
      // useFactory: (configService: ConfigService) => ({
      //   type: configService.get('DB_TYPE'),
      //   host: configService.get('DB_HOST'),
      //   port: Number(configService.get('DB_PORT')),
      //   username: configService.get('DB_USERNAME'),
      //   password: configService.get('DB_PASSWORD'),
      //   database: configService.get('DB_DATABASE'),
      //   synchronize: configService.get('DB_TYPEORM_SYNCHRONIZE') === 'true',
      //   logging: configService.get('DB_TYPEORM_LOGGING') === 'true',
      //   entities: [
      //     __dirname + '/../../**/*.entity{.ts,.js}',
      //   ],
      // } as TypeOrmModuleAsyncOptions)
    }),
    // LifecycleModule,
    UserModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
