import { Todo } from "src/todo/todo.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity('user')
export class User {
    @PrimaryColumn()
    id: string;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    picture: string;
    
    @Column({ nullable: true })
    currentRefreshToken: string;

    @Column({ type: 'datetime', nullable: true })
    currentRefreshTokenExp: Date;

    @OneToMany(()=> Todo, (todo)=> todo.user)
    todo: Todo[];

    @CreateDateColumn()
    createdAt: Date;
   
    @UpdateDateColumn()
    updatedAt: Date;

}