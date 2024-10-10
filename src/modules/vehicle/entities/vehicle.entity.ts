import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { VehicleAssignment } from '../../vehicle-assignment/entities/vehicle-assignment.entity';

@Entity('vehicles')
export class Vehicle {
	@PrimaryGeneratedColumn()
	id: number;

	@Column('text', { default: null })
	name: string;

	@Column('text', { default: null })
	color: string;

	@Column('text', { default: null })
	brand: string;

	@Column('text', { default: null })
	plate: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@DeleteDateColumn({ default: null })
	deletedAt: Date;

	@OneToMany(() => VehicleAssignment, assignment => assignment.vehicle)
	assignments: VehicleAssignment[];
}
