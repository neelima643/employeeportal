import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, CreateDateColumn } from "typeorm";
import { AbstractEntity } from "./abstractEntity";

import { Department } from "./Department";

@Entity("address")
    export class  Address extends AbstractEntity {
        @PrimaryGeneratedColumn("uuid")
        public id: string;
        @Column({ nullable: false })
        public addressLane1: string;

        @Column({nullable : true})
        public addressLane2: string;

        @Column({nullable : true})
        public city: string;


        @Column({ nullable: true })
        public state: string;

        @Column({ nullable: true })
        public country: string;

        @Column({ nullable: true })
        public pincode: string;

        
}

