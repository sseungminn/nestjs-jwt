import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshToken } from './rt.entity';

@Injectable()
export class RefreshTokenService {
    constructor(
        @InjectRepository(RefreshToken)
        private readonly rtRepository : Repository<RefreshToken>,
    ){}

    async findOne(userId: string): Promise<RefreshToken> {
        return this.rtRepository.findOne({
            where: {
                userId
            },
        });
    }
    
    async createToken(refreshToken: any){
        return this.rtRepository.save({
            refreshToken: refreshToken.refreshToken,
            userId: refreshToken.userId,
            expireAt: refreshToken.expireAt
        });
    }

    async updateToken(refreshToken: RefreshToken){
        return this.rtRepository.save(refreshToken);
    }
}
