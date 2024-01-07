import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';
import { Todo } from './todo/todo.entity';
import { TodoModule } from './todo/todo.module';
import { RefreshToken } from './refreshToken/rt.entity';
import { RefreshTokenModule } from './refreshToken/rt.module';

@Module({
  imports: [UsersModule, 
    AuthModule,
    TodoModule,
    RefreshTokenModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'hong',
      password: '1234',
      database: 'nestjs',
      entities: [User, Todo, RefreshToken],
      synchronize: false,
      logging: true,
  }),
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
