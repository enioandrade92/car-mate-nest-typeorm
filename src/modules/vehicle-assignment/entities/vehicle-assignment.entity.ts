import { Column, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Vehicle } from '../../vehicle/entities/vehicle.entity';
import { Driver } from '../../driver/entities/driver.entity';

export class VehicleAssignment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('date')
    startDateAssignment: Date;

    @Column('date')
    endDateAssignment: Date;

    @OneToOne(() => Vehicle)
    @JoinColumn()
    vehicle: Vehicle;

    @OneToOne(() => Driver)
    @JoinColumn()
    driver: Driver;
}
