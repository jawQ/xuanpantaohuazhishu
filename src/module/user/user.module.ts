import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInfoEntity } from 'src/entities/userInfo.entity';
import { UserController } from './user.controller';
import { AuthService } from 'src/module/auth/auth.service';
import { AuthModule } from 'src/module/auth/auth.module';
// import { ConfigModule, ConfigService } from 'src/config'

@Module({
  imports: [
    AuthModule,
    // ConfigModule,
    // 此模块使用 forFeature() 方法定义在当前范围中注册哪些存储库
    TypeOrmModule.forFeature([UserInfoEntity])
  ],
  providers: [UserService, AuthService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
