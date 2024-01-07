import { Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { TodoService } from './todo/todo.service';
import { RefreshTokenService } from './refreshToken/rt.service';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService,
              private readonly todoService: TodoService,
              private readonly rtService: RefreshTokenService) {}

  @Post('api/auth/login')
  login(@Request() req): any {
    return this.authService.login(req.body.userInfo);
  }

  @Get('/api/todo')
  getTodoList(@Request() req): any {
    return this.todoService.findAll();
  }

  @Post('/api/todo')
  insertTodo(@Request() req): any {
    console.log(req.body);
    return this.todoService.create(req.body);
  }

  @Put('/api/todo/:id')
  changeTodoStatus(@Param('id') id: number, @Request() req): any {
    console.log(req.body);
    return this.todoService.updateStatus(id, req.body);
  }

  @Delete('/api/todo/:id')
  deleteTodo(@Param('id') id: number, @Request() req){
    this.todoService.deleteTodo(id);
  }
}
