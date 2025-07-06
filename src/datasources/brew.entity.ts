import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Brew {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({type: "varchar", length: 40})
    beans!: string;

    @Column({type: "varchar", length: 20})
    method!: string;

    @Column({type: "timestamp"})
    brewedAt!: Date;

    @Column({type: "int"})
    time!: number;

    @Column({type: "int"})
    rating!: number;

    @Column({type: "varchar", nullable: true, length: 255})
    notes?: string;
}