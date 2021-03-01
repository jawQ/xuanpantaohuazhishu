import { Injectable } from '@nestjs/common';

@Injectable()
export class BeforeApplicationShutdownService {
  beforeApplicationShutdown(e) {
    console.log('app关闭前触发???：', e)
  }
}
