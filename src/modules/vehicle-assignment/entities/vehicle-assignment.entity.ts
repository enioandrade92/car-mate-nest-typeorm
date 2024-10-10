import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Vehicle } from '../../vehicle/entities/vehicle.entity';
import { Driver } from '../../driver/entities/driver.entity';
@Entity('vehicle_assignment')
export class VehicleAssignment {
	@PrimaryGeneratedColumn()
	id: number;

	@Column('text')
	reason: string;

	@Column('datetime')
	startDateAssignment: Date;

	@Column('datetime', { default: null })
	endDateAssignment: Date;

	@ManyToOne(() => Vehicle, vehicle => vehicle.assignments)
	vehicle: Vehicle;

	@ManyToOne(() => Driver, driver => driver.assignments)
	driver: Driver;
}
