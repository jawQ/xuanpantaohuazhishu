import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/module/user/user.service';
import { LoginPayload } from 'src/module/user/user.payload';
import { Hash } from 'src/utils/Hash';
import { UserInfoEntity } from 'src/entities/userInfo.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    // private readonly jwtService: JwtService,
  ) {}

  async validateUser(payload: LoginPayload): Promise<any> {
    const user = await this.userService.getByUserName(payload.userName);
    console.log('请求结果：', user)
    if (!user) throw new NotFoundException('用户不存在!')
    // const salt_1 = Hash.make(payload.passWord)
    // const salt_2 = Hash.make(user.passWord)
    // console.log('查看加盐后：', salt_1, salt_2)
    
    if(!Hash.compare(payload.passWord, user.passWord)) throw new UnauthorizedException('密码不正确')
    return user;
  }

  async createToken(user: UserInfoEntity) {
    const { passWord, ...result } = user
    // const accessToken =  this.jwtService.sign({ userName: user.userName, sub: user.userID })
    return {
      expiresIn: process.env.JWT_EXPIRATION_TIME,
      // accessToken,
      // ...result,
    };
  }
}
