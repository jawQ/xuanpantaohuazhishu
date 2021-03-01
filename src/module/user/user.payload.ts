import { Length, IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginPayload {
  @Length(2, 15, {message: '用户名最少2位数，最多15位'})
  @IsNotEmpty({message: '用户名不能为空'})
  userName: string;

  @IsNotEmpty({message: '密码不能为空'})
  @MinLength(6, {message: '密码最低6位数'})
  passWord: string;
}

export class RegisterPayload extends LoginPayload {}

export class StrategyOptionPayload {
  usernameField?: string;
  passwordField?: string;
  session?: boolean;
  passReqToCallback: true;
}