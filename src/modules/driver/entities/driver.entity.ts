import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { VehicleAssignment } from '../../vehicle-assignment/entities/vehicle-assignment.entity';

@Entity('drivers')
export class Driver {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text', { default: null })
    name: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn({ default: null })
    deletedAt: Date;

    @OneToMany(() => VehicleAssignment, (assignment) => assignment.driver)
    assignments: VehicleAssignment[];
}
