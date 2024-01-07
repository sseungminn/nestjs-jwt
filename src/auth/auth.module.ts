import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { RefreshTokenModule } from 'src/refreshToken/rt.module';

@Module({
  imports: [UsersModule, RefreshTokenModule, JwtModule.register({
    secret: 'SECRET',
    signOptions: {expiresIn: '1m'},
  }),],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
