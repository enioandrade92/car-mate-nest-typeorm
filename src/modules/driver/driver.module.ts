import { Module } from '@nestjs/common';
import { DriverService } from './driver.service';
import { DriverController } from './driver.controller';
import { Driver } from './entities/driver.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriverRepository } from './repository/driver.repository';

@Module({
    imports: [TypeOrmModule.forFeature([Driver])],
    controllers: [DriverController],
    providers: [DriverRepository, DriverService],
})
export class DriverModule { }
