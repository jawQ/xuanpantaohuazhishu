import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from 'src/module/config'

@Injectable()
export class LifecycleService implements OnModuleInit {
  constructor(
    private readonly configService: ConfigService
  ) {}
  onModuleInit() {
    console.log(`模块初始化成功(包含mysql初始化)...: http://localhost:${this.configService.get('APP_PORT')}`);
  }
}