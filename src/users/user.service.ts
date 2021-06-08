import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private customerRepository: Repository<User>,
      ) {}

      create(data: any): Promise<User>{
          const user : User = data
          return this.customerRepository.save(data);
      }
    
      findAll(): Promise<User[]> {
        return this.customerRepository.find();
      }
    
      findOne(id: string): Promise<User> {
        return this.customerRepository.findOne(id);
      }
}