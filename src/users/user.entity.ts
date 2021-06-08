import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class User {
  
  @Field()
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @Field()
  @Column({nullable: false})
  username: string;

  @Field()
  @Column({nullable: false})
  password: string;

  @Field()
  @Column({nullable: false})
  rol: string;

  @Field()
  @Column({ default: false })
  active: boolean;

  @Field()
  @Column({nullable: true})
  @CreateDateColumn()
  created_at?: Date;

  @Field()
  @Column({nullable: true})
  @UpdateDateColumn()
  updated_at?: Date;
}