import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
// import { ConfigModule } from 'src/config';
import { UserService } from 'src/module/user/user.service';
import { UserInfoEntity } from 'src/entities/userInfo.entity';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/user_pwd_auth.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        signOptions: { expiresIn: '60' },
        secret: process.env.JWT_SECRET,
      })
    }),
    TypeOrmModule.forFeature([UserInfoEntity]),
    PassportModule,
  ],
  providers: [AuthService, UserService, LocalStrategy],
  // exports: [PassportModule]
})
export class AuthModule {
  constructor(
    private readonly jwtService: JwtService,
  ) {
  }
}
