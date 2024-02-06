import {
    BadRequestException,
    HttpException,
    HttpStatus,
    Injectable,
    Logger,
} from '@nestjs/common';
import { CreateDriverDto } from './dto/create-driver.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Driver } from './entities/driver.entity';
import { IsNull, Repository } from 'typeorm';
import { DriverRepository } from './repository/driver.repository';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { FilterDriverDto } from './dto/filter-driver.dto';
import { VehicleAssignment } from '../vehicle-assignment/entities/vehicle-assignment.entity';
import { BaseRepository } from '../base-repository';

@Injectable()
export class DriverService {
    private readonly logger = new Logger(DriverService.name);
    private repository = new BaseRepository(this.driverRepository);
    constructor(
        @InjectRepository(Driver)
        private driverRepository: Repository<Driver>,
        @InjectRepository(DriverRepository)
        private driverCustomRepository: DriverRepository,
        @InjectRepository(VehicleAssignment)
        private vehicleAssignmentRepository: Repository<VehicleAssignment>,
    ) {}
    async createDriver(createDriver: CreateDriverDto) {
        try {
            const existDriver = await this.repository.findByName(
                createDriver.name,
            );
            if (existDriver) {
                throw new BadRequestException(
                    `Already exists the driver: ${existDriver.name}`,
                );
            }
            const createdDriver = await this.repository.create(createDriver);
            this.logger.log(
                `Created successfully the driver id ${createdDriver.id}`,
            );
            return createdDriver;
        } catch (error) {
            this.logger.error(
                `Failed to create new driver. Error: ${error.message}.`,
            );
            throw new HttpException(
                error.message,
                error.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async updateDriver(id: number, updateDriver: UpdateDriverDto) {
        try {
            const driver = await this.repository.findById(id);
            if (!driver) {
                throw new BadRequestException(`Not found driver id ${id}`);
            }
            const updatedDriver = await this.repository.update(
                driver,
                updateDriver,
            );
            this.logger.log(`Updated successfully the Driver id ${driver.id}`);
            return updatedDriver;
        } catch (error) {
            this.logger.error(
                `Failed to update the driver. Error: ${error.message}.`,
            );
            throw new HttpException(
                error.message,
                error.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async findDriverByFilters({ name, page = 1, limit = 10 }: FilterDriverDto) {
        try {
            return await this.driverCustomRepository.findDriverByFilters(name, {
                page,
                limit,
            });
        } catch (error) {
            this.logger.error(
                `Failed to find the driver. Error: ${error.message}.`,
            );
            throw new HttpException(
                error.message,
                error.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async findDriverById(id: number) {
        try {
            const driver = await this.repository.findById(id);
            if (!driver) {
                throw new BadRequestException(`Not found driver id ${id}`);
            }
            this.logger.log(`Driver id ${driver.id} found`);
            return driver;
        } catch (error) {
            this.logger.error(
                `Failed to find the driver. Error: ${error.message}.`,
            );
            throw new HttpException(
                error.message,
                error.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async removeDriver(id: number) {
        try {
            const register = await this.vehicleAssignmentRepository.findOne({
                where: {
                    endDateAssignment: IsNull(),
                    driver: { id: id },
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

            await this.repository.softDelete(id);
            const message = `Deleted successfully the driver id ${id}`;
            this.logger.log(message);
            return message;
        } catch (error) {
            this.logger.error(
                `Failed to delete the driver. Error: ${error.message}.`,
            );
            throw new HttpException(
                error.message,
                error.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
