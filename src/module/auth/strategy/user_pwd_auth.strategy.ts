import { Strategy } from 'passport-local';
import { PassportStrategy, PassportSerializer } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/module/auth';
import { LoginPayload, StrategyOptionPayload } from 'src/module/user/user.payload';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'auth_user_pwd') {
  constructor(private readonly authService: AuthService) {
    // 如果不调用super方法，子类就得不到this对象。
    // passport-local 用例中，没有配置选项，因此我们的构造函数只是调用 super() ，没有 options 对象。
    /**
      usernameField 设置 name 字段, 默认 username
      passwordField 设置 password 字段, 默认 password
      passReqToCallback 设置 request 是否回调函数的第一个参数, 默认 false (是第一个参数)
      session 设置 是否支持 session 会话, 保持持久化登录状态, 默认 true
     */
    super(
      // (token, done)=> done(null, this.validate(token))
      // 默认传递字段: username / password , 要想更改必须在 options 中配置
      // 还是好鸡肋
      {
        usernameField: 'userName',
        passwordField: 'passWord',
        // passReqToCallback: true
      } as StrategyOptionPayload
    )
    // console.log('前面...vali1111date: 12123123123123123', this)
  }

  /**
   * 只有请求至少带有下面2个参数时，该验证函数才会触发：
   * @param userName 用户名
   * @param passWord 密码
   * @return Promise 
   * 该函数将会在请求对象上创建一个属性，并返回。
   * 该属性值可通过 Request装饰器获取到
   */
  async validate(userName, passWord): Promise<any> {
    // console.log('L11111ocalStrategy...vali1111date: 12123123123123123', this, arguments)
    return await this.authService.validateUser({userName, passWord});
    // console.log('validate...user: ', user)
    // return user
  }
}
