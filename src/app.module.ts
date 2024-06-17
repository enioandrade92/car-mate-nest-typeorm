import { Module } from '@nestjs/common';
import { DriverModule } from './modules/driver/driver.module';
import { VehicleModule } from './modules/vehicle/vehicle.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSource } from './lib/typeorm/database/data-source';
import { ConfigModule } from '@nestjs/config';
import { VehicleAssignmentModule } from './modules/vehicle-assignment/vehicle-assignment.module';
import { AuthModule } from './modules/auth/auth.module';
@Module({
	imports: [
		ConfigModule.forRoot(),
		TypeOrmModule.forRootAsync({
			useFactory: () => dataSource,
		}),
		DriverModule,
		VehicleModule,
		VehicleAssignmentModule,
		AuthModule,
	],
})
export class AppModule {}
