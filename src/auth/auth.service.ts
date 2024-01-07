import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as jwt from 'jsonwebtoken';
import { User } from 'src/users/users.entity';
import { RefreshTokenService } from 'src/refreshToken/rt.service';
import { RefreshToken } from 'src/refreshToken/rt.entity';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, 
                private jwtService: JwtService,
                private readonly rtService: RefreshTokenService){}
    private readonly secretKey = 'SECRET';

    async validateToken(token: string): Promise<any> {
        try {
            const decodedToken = jwt.verify(token, this.secretKey);
            console.log(decodedToken);
            // const user = this.usersService.findOne(decodedToken.sub);
        } catch (error){
            throw new UnauthorizedException('Invalid Token');
        }
    }

    async login(user: User) {
        var loginUser = await this.usersService.findOne(user.id);
        
        if(!loginUser || loginUser===null) {
            loginUser = await this.usersService.create(user);
        }
        const payload = {
            id: loginUser.id,
            email: loginUser.email,
            username: loginUser.username,
            picture: loginUser.picture
        }

        let token = await this.rtService.findOne(loginUser.id);
        var accessToken = this.jwtService.sign(payload);
        var refreshToken = this.jwtService.sign(payload);
        const expireAt = new Date(new Date().setDate(new Date().getDate()+30));
        if((await token)?.refreshToken === undefined){ // 토큰이 없음
            const newToken = { refreshToken: refreshToken, userId: loginUser.id, expireAt: expireAt };
            this.rtService.createToken(newToken);
        } else { // 토큰이 있음
            if(token.expireAt <= new Date()){ // 만료됨
                token.refreshToken = refreshToken;
                token.expireAt = expireAt;
                this.rtService.updateToken(token);
            } else {
                refreshToken = token.refreshToken;
            }
            
        }
        return {
            access_token: accessToken,
            refresh_token: refreshToken
        }
    }
}
