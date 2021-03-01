// src/pipe/validation.pipe.ts
import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
// plainToClass 会把一个普通的js对象转换成指定类的实例
import { plainToClass } from 'class-transformer';
// 可以识别校验装饰器数据
import { validate } from 'class-validator';

// PipeTransform<T, R> 是一个通用接口，其中 T 表示 value 的类型，R 表示 transform() 方法的返回类型。
// 每个管道必须提供 transform() 方法
// 控制器的方法被调用之前会被插入一个管道，该管道会先拦截控制器的调用参数,进行转换或是验证处理，
// 然后用转换好或是验证好的参数来 调用原控制器方法
// 当该管道是在异常区域运行，则不会调用控制器的回调方法，从而直接返回值
/**
 * ？？？ 为什么要用管道 ？？？
 * ！！！  ！！！
 */
Injectable();
export class ValidationPipe implements PipeTransform {
  // value 就是传入的实际数据
  // metatype 就是元数据,其实就是装饰器添加那些
  async transform(value: any, { metatype }: ArgumentMetadata) {
    console.log('before controller params: ', value, metatype)
    if (!metatype || !this.toValidate(metatype)) {
      // 如果没有传入验证规则，则不验证，直接返回数据
      return {
        value
      };
    }
    // 将对象转换为 Class 来验证
    const object = plainToClass(metatype, value);
    // 同步阻塞,返回校验结果
    const errors = await validate(object);
    if (errors.length > 0) {
      // 只需要取第一个错误信息并返回即可
      const msg = Object.values(errors[0].constraints)[0]; 
      // 抛出这个异常,逻辑就会交付nest的错误拦截去了
      // 要拦截这个错误做处理,可以从filters入手,以后会说到
      throw new BadRequestException(`字段校验不通过: ${msg}`);
    }
    return value;
  }
  // 这个函数的意义就是：验证元数据传入的类型，是否是定义内的常规类型数据
  private toValidate(metatype: any): boolean {
    const types: any[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}


