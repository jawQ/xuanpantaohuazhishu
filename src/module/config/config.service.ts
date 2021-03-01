// import { Injectable, Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { ConfigService as ConfigServiceSource } from '@nestjs/config';

// @Injectable()
export class ConfigService extends ConfigServiceSource {
  private envConfig: { [key: string]: string };

  constructor(filePath: string) {
    // 读取.env文件，通过dotenv.parse方法形成key-value pairs
    // 存在envConfig变量里
    const envConfig = dotenv.parse(fs.readFileSync(filePath));
    // console.log('自定义 ConfigService constructor: ', this.envConfig)
    super(envConfig)
    this.envConfig = envConfig
  }

  get(key: string) {
    return this.envConfig[key];
  }
}
