import { Controller, Get, Post, HttpCode, Body, Request, HttpException, HttpStatus, UseFilters, UseGuards, Req } from '@nestjs/common'
import { UserService } from './user.service'
import { LoginPayload, RegisterPayload } from 'src/module/user/user.payload'
import { AuthService } from 'src/module/auth/auth.service'
// import { HttpExceptionFilter } from 'src/filter/http-exception.filter'
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from 'src/module/auth/guards/user_pwd_auth.guard'
/**
 * 22*67=1474
 * 74*3=222
 */
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {
    // console.log('user控制器：', this)
  }
  
  // @UseGuards(LocalAuthGuard)
  @Post('login')
  @UseGuards(AuthGuard('auth_user_pwd'))
  // 尽可能使用类而不是实例。由于 Nest 可以"轻松"地在整个模块中重复使用同一类的实例，因此可以减少内存使用。
  // @UseFilters(new HttpExceptionFilter())
  // @UseFilters(HttpExceptionFilter)
  async login(@Body() body: LoginPayload, @Request() req): Promise<any> {
    // console.log('login控制器：', req)
    const user = req.user
    // const user = await this.authService.validateUser(body)
    console.log('若执行到这，user.login用户即存在 : ', user)
    return await this.authService.createToken(user)
  }

  @Post('register')
  async register(@Body() body: RegisterPayload): Promise<any> {
    const user = await this.userService.create(body);
    return await this.authService.createToken(user);
  }
}
