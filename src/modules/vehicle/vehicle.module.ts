import { Module } from '@nestjs/common';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from './vehicle.service';
import { Vehicle } from './entities/vehicle.entity';
import { VehicleRepository } from './repository/vehicle.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleAssignment } from '../vehicle-assignment/entities/vehicle-assignment.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Vehicle, VehicleAssignment])],
    controllers: [VehicleController],
    providers: [VehicleService, VehicleRepository],
})
export class VehicleModule { }
