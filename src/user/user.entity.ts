import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class UserEntity {
  
  @PrimaryGeneratedColumn("uuid")
  uuid?: string;

  @Column({
    nullable: false,
    unique: true
  })
  username: string;

  @Column({nullable: false})
  password: string;

  @Column({nullable: false})
  rol: string;

  @Column({nullable: true})
  entityId?: number;

  @Column({ default: false })
  active?: boolean;

  @Column({nullable: true})
  @CreateDateColumn()
  created_at?: Date;

  @Column({nullable: true})
  @UpdateDateColumn()
  updated_at?: Date;
}