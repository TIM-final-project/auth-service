import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './args/create-user.input';
import { AllowedRol } from './enum/user-rol.enum';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
      ) {}

      create(createInputDTO: CreateUserInput): Promise<UserEntity>{
          const user : UserEntity = createInputDTO;
          return this.userRepository.save(user);
      }
    
      findAll(): Promise<UserEntity[]> {
        return this.userRepository.find();
      }
    
      findOne(id: string): Promise<UserEntity> {
        return this.userRepository.findOne(id);
      }

      findOneByUsername(username: string): Promise<UserEntity>{
        return this.userRepository.findOne({username: username})
      }

      async findByEntity(id: number, rol: AllowedRol): Promise<UserEntity>{
        // switch(rol){
        //   case AllowedRol.CONTRACTOR:
        //     return this.userRepository.findOne({rol: AllowedRol.CONTRACTOR, entityId: 1})
        //     break;
        // }
        return await {username: "martinbelcic", password: "passssss", rol: AllowedRol.CONTRACTOR, uuid: "5c1ad8fe-8ec2-4bbf-a0f8-603127a219a0"}
      }
}