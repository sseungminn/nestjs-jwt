import { Inject, Injectable } from '@nestjs/common';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository : Repository<User>,
    ){}

    async create(user: User): Promise<User> {
        console.log(user);
        // const newUser = this.userRepository.create(user);
        return await this.userRepository.save(user);
    }
    async findOne(id: string): Promise<User | undefined> {
        return await this.userRepository.findOne({
            where: {
                id
            }
        });
    }
}
