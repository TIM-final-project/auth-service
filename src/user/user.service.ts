import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { RegisterDto } from '../auth/dto/register.dto';
import { AllowedRol } from './enum/user-rol.enum';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { UserQuery } from './interfaces/user-query.interface';
import { UserQPs } from './interfaces/user.qps';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  create(createUserDTO: RegisterDto): Promise<UserEntity> {
    return this.userRepository.save(createUserDTO as UserEntity);
  }

  update(user: UserEntity): Promise<UserEntity> {
    return this.userRepository.save(user);
  }

  findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  findByRol(userQPs: UserQPs): Promise<UserEntity[]> {
    const rols = userQPs.rols;
    const where: UserQuery = {
      active: true,
    }
    
    if (rols?.length) {
      where.rol = In(rols);
    }
    
    return this.userRepository.find({
      where
    });
  }

  findOne(id: string): Promise<UserEntity> {
    return this.userRepository.findOne(id);
  }

  findOneByUsername(username: string): Promise<UserEntity> {
    return this.userRepository.findOne({ username: username });
  }

  async findByEntity(id: number, rol: AllowedRol): Promise<UserEntity> {
    return this.userRepository.findOne({
      rol: rol,
      entityId: id,
    });
  }
}
