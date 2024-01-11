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

@Injectable()
export class VehicleService {
    private readonly logger = new Logger(VehicleService.name);
    constructor(
        @InjectRepository(Vehicle)
        private vehicleRepository: Repository<Vehicle>,
        @InjectRepository(VehicleRepository)
        private vehicleCustomRepository: VehicleRepository,
        @InjectRepository(VehicleAssignment)
        private vehicleAssignmentRepository: Repository<VehicleAssignment>,
    ) { }
    async create(createVehicle: CreateVehicleDto) {
        try {
            const existVehicle = await this.vehicleRepository.findOne({
                where: { plate: createVehicle.plate },
            });
            if (existVehicle) {
                throw new BadRequestException(
                    `Already exists the vehicle: ${existVehicle}`,
                );
            }
            const createdVehicle = await this.vehicleRepository.save(
                createVehicle,
            );
            this.logger.log(
                `Created successfully the vehicle: ${createdVehicle.name}`,
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

    async update(id: number, updateVehicle: UpdateVehicleDto) {
        try {
            const vehicle = await this.vehicleRepository.findOne({
                where: { id },
            });
            if (!vehicle) {
                throw new BadRequestException(`Not found vehicle: ${vehicle}`);
            }
            const updatedVehicle = await this.vehicleRepository.save({
                ...vehicle,
                ...updateVehicle,
            });
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

    async findAll(filters?: FilterVehicleDto) {
        try {
            return await this.vehicleCustomRepository.searchVehicle(filters);
        } catch (error) {
            this.logger.error(
                `Failed to find the vehicle. Error: ${error.message}.`,
            );
            throw new HttpException(
                error.message,
                error.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async findOne(id: number) {
        try {
            const vehicle = await this.vehicleRepository.findOne({
                where: { id },
            });
            if (!vehicle) {
                throw new BadRequestException(`Not found vehicle: ${vehicle}`);
            }
            this.logger.log(`Vehicle ${vehicle.name} found`);
            return vehicle;
        } catch (error) {
            this.logger.error(
                `Failed to find the vehicle. Error: ${error.message}.`,
            );
            throw new HttpException(
                error.message,
                error.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async remove(id: number) {
        try {
            const register = await this.vehicleAssignmentRepository.findOne({
                where: {
                    endDateAssignment: IsNull(),
                    vehicle: { id: id },
                },
                relations: { driver: true, vehicle: true },
            });

            if (register) {
                const { name } = register.driver;
                const { id } = register.vehicle;
                throw new BadRequestException(
                    `Finalize the link between the ${name} driver and the ${id} car before deleting`,
                );
            }

            await this.vehicleRepository.softDelete(id);
            const message = `Deleted successfully the vehicle: ${id}`;
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
