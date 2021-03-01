import { Injectable, CanActivate } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('user_pwd_auth') {
  constructor() {
    console.log('LocalAuthGuard...')
    super()
  }
}