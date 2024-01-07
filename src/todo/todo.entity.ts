import { User } from "src/users/users.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('todo')
export class Todo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    // @Column()
    // startTime: Date;

    // @Column()
    // endTime: Date;
    
    @Column()
    status: STATUS;

    // @Column()
    // description: string;

    @ManyToOne(()=> User, (user) => user.id)
    user: User;

    @CreateDateColumn()
    createdAt: Date;
   
    @UpdateDateColumn()
    updatedAt: Date;

}

enum STATUS {
    working, done
}