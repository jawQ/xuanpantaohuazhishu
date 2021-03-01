import * as bcrypt from 'bcryptjs';

export class Hash {
  static make(plainText) {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(plainText, salt);
  }

  /**
   * 密码验证：
   * @param plainText 输入的值
   * @param hash 已生成hash的值
   */
  static compare(plainText, hash) {
    const result = bcrypt.compareSync(plainText, hash)
    console.log('compare after（boolean）: ', bcrypt.compareSync, result)
    return result
  }
}
