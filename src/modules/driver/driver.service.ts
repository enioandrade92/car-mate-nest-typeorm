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
import { Repository } from 'typeorm';
import { DriverRepository } from './repository/driver.repository';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { FilterFindDto } from './dto/filter-find.dto';

@Injectable()
export class DriverService {
    private readonly logger = new Logger(DriverService.name);
    constructor(
        @InjectRepository(Driver)
        private repositoryDriver: Repository<Driver>,
        @InjectRepository(DriverRepository)
        private customDriverRepository: DriverRepository,
    ) { }
    async create(createDriver: CreateDriverDto) {
        try {
            const existDriver = await this.repositoryDriver.findOne({
                where: { name: createDriver.name },
            });
            if (existDriver) {
                throw new BadRequestException(
                    `Already exists the driver: ${existDriver}`,
                );
            }
            const savedDriver = await this.repositoryDriver.save(createDriver);
            this.logger.log(
                `Created successfully the Driver: ${savedDriver.name}`,
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
            const driver = await this.repositoryDriver.findOne({
                where: { id },
            });
            if (!driver) {
                throw new BadRequestException(`Not found driver: ${driver}`);
            }
            await this.repositoryDriver.update(id, updateDriver);
            this.logger.log(`Updated successfully the Driver: ${driver.name}`);
            return await this.repositoryDriver.findOne({
                where: { id },
            });
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

    async findAll(filter: FilterFindDto) {
        try {
            const { name, ...paginate } = filter;
            return await this.customDriverRepository.searchDriver(
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
            const driver = await this.repositoryDriver.findOne({
                where: { id },
            });
            if (!driver) {
                throw new BadRequestException(`Not found driver: ${driver}`);
            }
            this.logger.log(`Driver ${driver.name} found`);
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

    remove(id: number) {
        return `This action removes a #${id} driver`;
    }
}
