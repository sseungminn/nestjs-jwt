import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(Todo)
        private readonly todoRepository : Repository<Todo>,
    ){}

    async create(todo: Todo): Promise<Todo> {
        // const newUser = this.userRepository.create(user);
        todo.status = 0;
        return await this.todoRepository.save(todo);
    }

    async updateStatus(id:number, todo: Todo): Promise<void> {
        console.log(todo);
        const oldTodo = await this.todoRepository.findOne({
            where: {
                id
            }
        });
        oldTodo.status = todo.status;
        await this.todoRepository.save(oldTodo);
    }
    async deleteTodo(id:number): Promise<void> {
        const oldTodo = await this.todoRepository.findOne({
            where: {
                id
            }
        });
        await this.todoRepository.delete({id: oldTodo.id});
    }
    async findAll(): Promise<Array<Todo> | undefined> {
        return await this.todoRepository.find();
    }
    async findOne(id: number): Promise<Todo | undefined> {
        return await this.todoRepository.findOne({
            where: {
                id
            }
        });
    }
}
