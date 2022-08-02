import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, CreateDateColumn } from "typeorm";
import { AbstractEntity } from "./abstractEntity";

import { Department } from "./Department";

@Entity("employee")
    export class  Employee extends AbstractEntity {
        @PrimaryGeneratedColumn("uuid")
        public id: string;
        @Column({ nullable: false })
        public name: string;

        @Column({nullable : true})
        public username: string;

        @Column({nullable : true})
        public passsword: string;


        @Column({ nullable: true })
        public join_date?: Date;

        @Column({ nullable: true })
        public role: string;

        @Column({ nullable: true })
        public status: string;

        @Column({ nullable: true })
        public experience: number;
        

        
        @ManyToOne(() => Department, { cascade: true })
    @JoinColumn()
    public department: Department;
        @Column({ nullable: false })
        public departmentId: string;
        
}

