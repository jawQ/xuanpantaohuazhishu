import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/main/app.module';
import { ValidationPipe } from './middleware/pipes/validation.pipe';
import { HttpExceptionFilter } from './middleware/filter/http-exception.filter';
import { ConfigService } from 'src/module/config';
import { Logger } from 'src/lib/logger';

// webpack:
// const FILEPATH = __dirname + `/env/${process.env.NODE_ENV || 'development'}.env`;
// const FILEPATH = __dirname + `/../env/${process.env.NODE_ENV || 'development'}.env`;
const PORT = process.env.APP_PORT

async function bootstrap() {
  // 日志
  const app = await NestFactory.create(AppModule, {
    cors: false,
    logger: false
  });
  console.log('根模块：', process.env.LOG_PATH)
  // const logger = new Logger(process.env.LOG_PATH)
  // app.useLogger(logger)
  // 设置全局管道
  app.useGlobalPipes(new ValidationPipe())
  // 报错过滤器：
  // app.useGlobalFilters(new HttpExceptionFilter(logger))
  app.useGlobalFilters(new HttpExceptionFilter())
  await app.listen(PORT)
  console.log(`${process.env.APP_PORT }环境启动成功，请访问：${await app.getUrl()}`)
}

// 一般来说，一个请求流经中间件、守卫与拦截器，然后到达管道，并最终回到拦截器中的返回路径中（从而产生响应）。
bootstrap();
