import {
	BadRequestException,
	HttpException,
	HttpStatus,
	Injectable,
	Logger,
} from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { IsNull, Repository } from 'typeorm';
import { FilterVehicleDto } from './dto/filter-vehicle.dto';
import { VehicleRepository } from './repository/vehicle.repository';
import { VehicleAssignment } from '../vehicle-assignment/entities/vehicle-assignment.entity';
import { BaseRepository } from '../base-repository';

@Injectable()
export class VehicleService {
	private readonly logger = new Logger(VehicleService.name);
	private repository = new BaseRepository(this.vehicleRepository);
	constructor(
		@InjectRepository(Vehicle)
		private vehicleRepository: Repository<Vehicle>,
		@InjectRepository(VehicleRepository)
		private vehicleCustomRepository: VehicleRepository,
		@InjectRepository(VehicleAssignment)
		private vehicleAssignmentRepository: Repository<VehicleAssignment>,
	) {}
	async createVehicle(createVehicle: CreateVehicleDto) {
		try {
			const existVehicle = await this.vehicleRepository.findOne({
				where: { plate: createVehicle.plate },
			});
			if (existVehicle) {
				throw new BadRequestException(
					`Already exists the vehicle plate ${existVehicle.plate}`,
				);
			}
			const createdVehicle = await this.repository.create(createVehicle);
			this.logger.log(
				`Created successfully the vehicle id ${createdVehicle.id}`,
			);
			return createdVehicle;
		} catch (error) {
			this.logger.error(
				`Failed to create new vehicle. Error: ${error.message}.`,
			);
			throw new HttpException(
				error.message,
				error.status || HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	async updateVehicle(id: number, updateVehicle: UpdateVehicleDto) {
		try {
			const vehicle = await this.repository.findById(id);
			if (!vehicle) {
				throw new BadRequestException(`Not found vehicle id ${id}`);
			}
			const updatedVehicle = await this.repository.update(
				vehicle,
				updateVehicle,
			);
			this.logger.log(`Updated successfully the vehicle: ${vehicle.id}`);
			return updatedVehicle;
		} catch (error) {
			this.logger.error(
				`Failed to update the vehicle. Error: ${error.message}.`,
			);
			throw new HttpException(
				error.message,
				error.status || HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	async findVehicleByFilters(filters?: FilterVehicleDto) {
		try {
			return await this.vehicleCustomRepository.findVehicleByFilters(filters);
		} catch (error) {
			this.logger.error(`Failed to find the vehicle. Error: ${error.message}.`);
			throw new HttpException(
				error.message,
				error.status || HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	async findVehicleById(id: number) {
		try {
			const vehicle = await this.repository.findById(id);
			if (!vehicle) {
				throw new BadRequestException(`Not found vehicle id ${id}`);
			}
			this.logger.log(`Vehicle id ${vehicle.id} found`);
			return vehicle;
		} catch (error) {
			this.logger.error(`Failed to find the vehicle. Error: ${error.message}.`);
			throw new HttpException(
				error.message,
				error.status || HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	async removeVehicle(id: number) {
		try {
			const register = await this.vehicleAssignmentRepository.findOne({
				where: {
					endDateAssignment: IsNull(),
					vehicle: { id: id },
				},
				relations: { driver: true, vehicle: true },
			});

			if (register) {
				const { id: driverId } = register.driver;
				const { id: vehicleId } = register.vehicle;
				throw new BadRequestException(
					`Finalize the link between the driver id ${driverId} and the vehicle id ${vehicleId} before deleting`,
				);
			}

			await this.vehicleRepository.softDelete(id);
			const message = `Deleted successfully the vehicle id ${id}`;
			this.logger.log(message);
			return message;
		} catch (error) {
			this.logger.error(
				`Failed to delete the vehicle. Error: ${error.message}.`,
			);
			throw new HttpException(
				error.message,
				error.status || HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}
}
