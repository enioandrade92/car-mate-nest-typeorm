import { Module } from '@nestjs/common';
import { DriverService } from './driver.service';
import { DriverController } from './driver.controller';
import { Driver } from './entities/driver.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriverRepository } from './repository/driver.repository';
import { VehicleAssignment } from '../vehicle-assignment/entities/vehicle-assignment.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Driver, VehicleAssignment])],
	controllers: [DriverController],
	providers: [DriverRepository, DriverService],
})
export class DriverModule {}
