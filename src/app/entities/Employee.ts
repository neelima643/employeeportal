import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, CreateDateColumn, OneToOne } from "typeorm";
import { AbstractEntity } from "./abstractEntity";
import { Address } from "./address";

import { Department } from "./Department";

@Entity("employee")
    export class  Employee extends AbstractEntity {
        @PrimaryGeneratedColumn("uuid")
        public id: string;
        @Column({ nullable: false })
        public name: string;

        @Column({nullable : false})
        public username: string;

        @Column({nullable : false})
        public passsword: string;


        @Column({ nullable: false })
        public join_date: Date;

        @Column({ nullable: false })
        public role: string;

        @Column({ nullable: false })
        public status: string;

        @Column({ nullable: false })
        public experience: number;
        
        @ManyToOne(() => Department, { cascade: true })
    @JoinColumn()
    public department: Department;
        @Column({ nullable: false })
        public departmentId: string;

        @OneToOne(() => Address, { cascade: true })
    @JoinColumn()
    public address: Address;
        @Column({ nullable: false })
        public addressId: string;
        
}

