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

@Injectable()
export class DriverService {
    private readonly logger = new Logger(DriverService.name);
    constructor(
        @InjectRepository(Driver)
        private driverRepository: Repository<Driver>,
        @InjectRepository(DriverRepository)
        private driverCustomRepository: DriverRepository,
        @InjectRepository(VehicleAssignment)
        private vehicleAssignmentRepository: Repository<VehicleAssignment>,
    ) { }
    async create(createDriver: CreateDriverDto) {
        try {
            const existDriver = await this.driverRepository.findOne({
                where: { name: createDriver.name },
            });
            if (existDriver) {
                throw new BadRequestException(
                    `Already exists the driver: ${existDriver.name}`,
                );
            }
            const savedDriver = await this.driverRepository.save(createDriver);
            this.logger.log(
                `Created successfully the driver id ${savedDriver.id}`,
            );
            return savedDriver;
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

    async update(id: number, updateDriver: UpdateDriverDto) {
        try {
            const driver = await this.driverRepository.findOne({
                where: { id },
            });
            if (!driver) {
                throw new BadRequestException(`Not found driver id ${id}`);
            }
            const updatedDriver = await this.driverRepository.save({
                ...driver,
                ...updateDriver,
            });
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

    async findAll(filter: FilterDriverDto) {
        try {
            const { name, ...paginate } = filter;
            return await this.driverCustomRepository.searchDriver(
                name,
                paginate,
            );
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

    async findOne(id: number) {
        try {
            const driver = await this.driverRepository.findOne({
                where: { id },
            });
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

    async remove(id: number) {
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

            await this.driverRepository.softDelete(id);
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
