// src/entities/article.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity()
export class UserInfoEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    comment: '主键id',
  })
  id: number;

  @Column('varchar', {
    nullable: false,
    comment: '用户名称',
  })
  userName: string;

  @Column('varchar', {
    nullable: false,
    comment: '用户密码',
  })
  passWord: string;

  @Column({
    nullable: false,
    name: 'user_id',
    comment: '用户id',
  })
  userID: string;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    comment: '创建时间',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
    comment: '最后更新时间',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    type: 'timestamp',
    name: 'delete_at',
    comment: '删除',
  })
  deleteAt: Date;
}