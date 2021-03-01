import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus,  } from '@nestjs/common';
import { Request, Response } from 'express';
import { Logger } from 'src/lib/logger';

const line = '-'.repeat(50);
// 判断是否中文
const chinese = /.*[\u4e00-\u9fa5]+.*/;
// 错误状态码中文
const HttpStatusText = {
  'Bad Request': '请求参数错误',
  'Unauthorized': '未经授权',
  'Not Found': '未找到地址',
  'Internal Server Error': '服务器错误',
  'Forbidden': '权限不足',
  'Request Timeout': '请求超时异常',
};

/**
 * 报错过滤器
 */
@Catch()
export class HttpExceptionFilter<T> implements ExceptionFilter {
  // constructor(private readonly logger: Logger) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    // const { logger } = this;
    // const logger = console
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const errorLog = exception;
    let code = HttpStatus.INTERNAL_SERVER_ERROR;
    let error = 'Internal Server Error';
    let msg;

    // 请求错误
    if (exception instanceof HttpException) {
      const res = exception.getResponse();
      if (typeof res !== 'string') {
        const { statusCode = exception.getStatus(), message, error: err = message } = res as any;
        code = statusCode;
        error = err;
        msg = Array.isArray(message) ? message[0] : message;
      }
    } else {
      console.error(errorLog, '服务运行错误')
      // logger.error(errorLog, '服务运行错误');
    }

    // 尽可能转为中文
    const message = (chinese.test(msg) && msg) || HttpStatusText[error] || error;

    const resJson = { code, error, message, timestamp: new Date().toISOString(), path: request.url};

    console.error(resJson, '响应错误')
    console.error(line, '请求结束')
    // 错误日志
    // logger.error(resJson, '响应错误');
    // logger.log(line, '请求结束: ');

    response.status(code).json(resJson);

    // response
    //   .status(status)
    //   .json({
    //     statusCode: status,
    //     timestamp: new Date().toISOString(),
    //     path: request.url,
    //   });
  }
}
