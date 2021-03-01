import { Logger as LoggerSource } from '@nestjs/common';
// import * as log4js from 'log4js';
import log4js from 'log4js';
// import path from 'path'
// const log4js = require('log4js')

/**
 * %d – 时间，默认以 ISO8601 规范格式化，
 * 可选规范有 ISO8601, ISO8601_WITH_TZ_OFFSET, ABSOUTE, DATE 或者任何可支持格式化的字串，
 * 例如 %d{DATE} 或者 %d{yyyy/MM/dd-hh.mm.ss}。
 */
const format_logger_output_normal = '[%d{yyyy年MM月dd日 - hh:mm:ss SSS毫秒}] [%p] %m'
const format_logger_output_error = '[%d{yyyy年MM月dd日 - hh:mm:ss SSS毫秒}] [%p] %z %h %m'
const base_appender_config = {
  // 日志文件按日期（天）切割
  pattern: 'yyyy-MM-dd.log',
  // 回滚旧的日志文件时，保证以 .log 结尾 （只有在 alwaysIncludePattern 为 false 生效）
  keepFileExt: true,
  // 输出的日志文件名是都始终包含 pattern 日期结尾
  alwaysIncludePattern: true,
  // 指定日志保留的天数
  daysToKeep: 7,
}

export class Logger extends LoggerSource {
  log4js: log4js.Logger

  constructor(filename: string) {
    super();
    /**
     * appenders(附着器): 定义日志输出到哪个位置, appenders内每一个对象就相当于：每一个日志输出员工
     * categories: 作为getLogger方法的键名对你应，里面的key可自由灵活使用getLogger(key)调用具体实例
     * Layout: 决定 如何输出日志，即格式化输出内容
     * 
     * pattern : 日志文件名的格式
     * type: type等级排序：all>trace>debug>info>warn>error>fatal>mark>off(off 不输出任何日志)
     */
    log4js.configure({
      appenders: {
        all: {
          ...base_appender_config,
          type: 'dateFile',
          filename: `${filename}/all/all`,
          // 配置 layout，此处使用自定义模式 pattern
          layout: { type: 'pattern', pattern: format_logger_output_normal },
        },
        // errorHandler: {
        //   ...base_appender_config,
        //   type: 'dateFile', 
        //   filename: `${filename}/error/error`,
        //   layout: { type: 'pattern', pattern: format_logger_output_error },
        // },
        // // 错误日志：
        // 'just-errors': {
        //   type: 'logLevelFilter',
        //   appender: 'errorHandler',
        //   level: 'error',
        // },
        // // 除错误外的正常日志：
        // 'normal': {
        //   type: 'logLevelFilter',
        //   appender: 'all',
        //   // 这里设置最低级别为info，真正被下方的categories使用时，再在categories设定为具体其他级别或保持info
        //   level: 'all', 
        // },
      },
      categories: { 
        // 里面已添加lavel，外层为何还要添加？以哪个为准？
        default: { appenders: ['all'], level: 'all' },
        // default: { appenders: ['normal', 'just-errors'], level: 'all' },
      },
    })
    this.log4js = log4js.getLogger(`${process.env.PROJECT_NAME}-${process.env.NODE_ENV}`)
    // log4js.setLevel('INFO')
    // 这一步不就覆盖了上面刚定义的this.log4js了？为什么要这么做？？？
    // this.log4js = log4js.getLogger(`${process.env.PROJECT_NAME}-${process.env.NODE_ENV}`);
  }

  log(message: any, trace: string) {
    console.log(trace, message)
    super.log(message, trace);
    this.log4js.info(trace, message);
  }

  error(message: any, trace: string) {
    console.error(trace, message)
    super.error(message, trace);
    this.log4js.error(trace, message);
  }

  warn(message: any, trace: string) {
    console.warn(trace, message)
    super.warn(message, trace);
    this.log4js.warn(trace, message);
  }

  debug(message: any, trace: string) {
    console.debug(trace, message)
    super.debug(message, trace);
    this.log4js.debug(trace, message);
  }

  verbose(message: any, trace: string) {
    console.log(trace, message)
    super.verbose(message, trace);
    this.log4js.info(trace, message);
  }
}
