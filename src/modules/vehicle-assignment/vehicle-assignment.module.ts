import { Module } from '@nestjs/common';
import { VehicleAssignmentService } from './vehicle-assignment.service';
import { VehicleAssignmentController } from './vehicle-assignment.controller';
import { Vehicle } from '../vehicle/entities/vehicle.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from '../driver/entities/driver.entity';
import { VehicleAssignment } from './entities/vehicle-assignment.entity';

@Module({
    imports: [TypeOrmModule.forFeature([VehicleAssignment, Driver, Vehicle])],
    controllers: [VehicleAssignmentController],
    providers: [VehicleAssignmentService],
})
export class VehicleAssignmentModule { }
