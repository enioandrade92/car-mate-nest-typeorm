import {
    Column,
    Entity,
    JoinColumn,
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

    @Column('date')
    startDateAssignment: Date;

    @Column('date', { default: null })
    endDateAssignment: Date;

    @OneToOne(() => Vehicle)
    @JoinColumn()
    vehicle: Vehicle;

    @OneToOne(() => Driver)
    @JoinColumn()
    driver: Driver;
}
