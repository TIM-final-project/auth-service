import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  uuid: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  rol: string;

  @Column({ default: false })
  active: boolean;
}