import {
	BadRequestException,
	HttpException,
	HttpStatus,
	Injectable,
	Logger,
	NotFoundException,
} from '@nestjs/common';
import { RegisterVehicleDto } from './dto/register-vehicle-assignment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from '../vehicle/entities/vehicle.entity';
import { IsNull, Repository } from 'typeorm';
import { Driver } from '../driver/entities/driver.entity';
import { VehicleAssignment } from './entities/vehicle-assignment.entity';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';

@Injectable()
export class VehicleAssignmentService {
	private readonly logger = new Logger(VehicleAssignmentService.name);
	constructor(
		@InjectRepository(VehicleAssignment)
		private vehicleAssignmentRepository: Repository<VehicleAssignment>,
		@InjectRepository(Vehicle)
		private vehicleRepository: Repository<Vehicle>,
		@InjectRepository(Driver)
		private driverRepository: Repository<Driver>,
	) {}

	private async checkDriverAndVehicle(driverId: number, vehicleId: number) {
		const driver = await this.driverRepository.findOne({
			where: { id: driverId },
		});
		if (!driver) {
			throw new NotFoundException(`Not found driver id ${driverId}`);
		}
		const vehicle = await this.vehicleRepository.findOne({
			where: { id: vehicleId },
		});
		if (!vehicle) {
			throw new NotFoundException(`Not found vehicle id ${vehicleId}`);
		}
		return { vehicle, driver };
	}

	private async checkRegister(driverId: number, vehicleId: number) {
		return await this.vehicleAssignmentRepository
			.createQueryBuilder('assignment')
			.innerJoinAndSelect('assignment.driver', 'driver')
			.innerJoinAndSelect('assignment.vehicle', 'vehicle')
			.where('"assignment"."endDateAssignment" is null')
			.andWhere('(driver.id = :driverId OR vehicle.id = :vehicleId)', {
				driverId,
				vehicleId,
			})
			.getMany();
	}

	async register({ driverId, vehicleId, reason }: RegisterVehicleDto) {
		try {
			const register = await this.checkRegister(driverId, vehicleId);

			if (register.length) {
				const { name } = register[0].driver;
				const { id } = register[0].vehicle;
				throw new BadRequestException(
					`${name} driver already has linked a vehicle id ${id}`,
				);
			}
			const { vehicle, driver } = await this.checkDriverAndVehicle(
				driverId,
				vehicleId,
			);

			const Assignment: Partial<VehicleAssignment> = {
				vehicle,
				driver,
				reason,
				startDateAssignment: new Date(),
			};
			const savedAssignment = await this.vehicleAssignmentRepository.save(
				Assignment,
			);
			this.logger.log(
				`The car id ${vehicle.id} was linked to the driver id ${driver.id} `,
			);

			return savedAssignment;
		} catch (error) {
			this.logger.error(`Failed to register. Error: ${error.message}.`);
			throw new HttpException(
				error.message,
				error.status || HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	async finish({ driverId, vehicleId }: UpdateAssignmentDto) {
		try {
			const register = await this.vehicleAssignmentRepository.findOne({
				where: {
					endDateAssignment: IsNull(),
					driver: { id: driverId },
					vehicle: { id: vehicleId },
				},
				relations: { driver: true, vehicle: true },
			});
			if (!register) {
				throw new BadRequestException(
					`driver id ${driverId} does not have a linked vehicle`,
				);
			}

			register.endDateAssignment = new Date();
			const updateRegister = await this.vehicleAssignmentRepository.save(
				register,
			);
			this.logger.log(
				`The vehicle id ${vehicleId} was unlinked to the driver id ${driverId} `,
			);

			return updateRegister;
		} catch (error) {
			this.logger.error(`Failed to finish register. Error: ${error.message}.`);
			throw new HttpException(
				error.message,
				error.status || HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	async findByVehicleId(vehicleId: number) {
		try {
			return await this.vehicleAssignmentRepository.find({
				where: { vehicle: { id: vehicleId } },
				relations: { driver: true, vehicle: true },
				order: { id: 'DESC' },
			});
		} catch (error) {
			this.logger.error(`Failed to find registers. Error: ${error.message}.`);
			throw new HttpException(
				error.message,
				error.status || HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	async findByDriverId(driverId: number) {
		try {
			return await this.vehicleAssignmentRepository.find({
				where: { driver: { id: driverId } },
				relations: { driver: true, vehicle: true },
				order: { id: 'DESC' },
			});
		} catch (error) {
			this.logger.error(`Failed to find registers. Error: ${error.message}.`);
			throw new HttpException(
				error.message,
				error.status || HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}

	async findByDriverName(name: string) {
		try {
			return await this.vehicleAssignmentRepository.find({
				where: { driver: { name } },
				relations: { driver: true, vehicle: true },
				order: { id: 'DESC' },
			});
		} catch (error) {
			this.logger.error(`Failed to find registers. Error: ${error.message}.`);
			throw new HttpException(
				error.message,
				error.status || HttpStatus.INTERNAL_SERVER_ERROR,
			);
		}
	}
}
