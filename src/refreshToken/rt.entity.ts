import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('refreshToken')
export class RefreshToken {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 512})
    refreshToken: string;

    @Column()
    userId: string;

    @CreateDateColumn()
    createdAt: Date;

    @Column({nullable: true})
    expireAt: Date;

}