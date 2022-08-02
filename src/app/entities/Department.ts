import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, JoinColumn, OneToMany } from "typeorm";
import { AbstractEntity } from "./abstractEntity";
import { Employee } from "./Employee";

@Entity("department")
export class Department extends AbstractEntity {
    @PrimaryGeneratedColumn("uuid")
    public id: string;
    @Column({ nullable: false })
    public name: string;
    @Column({ nullable: true })
    public deptHead: string;

    @OneToMany(() => Employee, (employee) => employee.department)
    @JoinColumn()
    public employee: Employee[];
}