import { Module } from '@nestjs/common';
import { DriverModule } from './modules/driver/driver.module';
import { VehicleModule } from './modules/vehicle/vehicle.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSource } from './lib/typeorm/database/data-source';

@Module({
    imports: [TypeOrmModule.forRoot(dataSource), DriverModule, VehicleModule],
})
export class AppModule { }
