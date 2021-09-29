import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AllowedRol } from './enum/user-rol.enum';
import { Exclude } from 'class-transformer';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid?: string;

  @Column({
    nullable: false,
    unique: true,
  })
  username: string;

  @Exclude()
  @Column({ nullable: false })
  password: string;

  @Column({
    type: 'enum',
    enum: AllowedRol,
    nullable: false,
  })
  rol: AllowedRol;

  @Column({ nullable: true })
  entityId?: number;

  @Column({ default: false })
  active: boolean;

  @Column({ nullable: true })
  @CreateDateColumn()
  created_at?: Date;

  @Column({ nullable: true })
  @UpdateDateColumn()
  updated_at?: Date;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
