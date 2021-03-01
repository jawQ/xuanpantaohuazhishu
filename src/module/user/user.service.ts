import { Injectable, NotAcceptableException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, createQueryBuilder, getConnection, getRepository } from 'typeorm'
import { UserInfoEntity } from 'src/entities/userInfo.entity';
import { LoginPayload, RegisterPayload } from 'src/module/user/user.payload'

@Injectable()
export class UserService {
  constructor(
    // 该装饰器需要配合在module中使用forFeature来使用：
    // 即需要先在module中导入该实体，
    // 然后装饰器InjectRepository才能将实体注入到当前service中使用
    @InjectRepository(UserInfoEntity)
    private readonly userInfoRepo: Repository<UserInfoEntity>
  ) {}

  async getByUserName(userName: String): Promise<any> {
    return await this.userInfoRepo
      .createQueryBuilder('userInfo')
      .where('userInfo.userName = :userName')
      .setParameter('userName', userName)
      .getOne();
  }

  async getUserInfo(body: LoginPayload): Promise<any> {
    const result = null
    console.log('进入service的body：', body)
    return result
  }

  async create(payload: RegisterPayload) {
    const user = await this.getByUserName(payload.userName);

    if (user) {
      throw new NotAcceptableException(
        'User with provided email already created.',
      );
    }

    return await this.userInfoRepo.save(this.userInfoRepo.create(payload));
  }
}
