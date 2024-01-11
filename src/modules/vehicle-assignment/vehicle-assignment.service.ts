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

    private async checkDriverAndVehicle(driverId, vehicleId) {
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
    async register({ driverId, vehicleId, reason }: RegisterVehicleDto) {
        try {
            const register = await this.vehicleAssignmentRepository.findOne({
                where: {
                    endDateAssignment: IsNull(),
                    driver: { id: driverId },
                },
                relations: { driver: true, vehicle: true },
            });

            if (register) {
                const { name } = register.driver;
                const { id } = register.vehicle;
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
            this.logger.error(
                `Failed to finish register. Error: ${error.message}.`,
            );
            throw new HttpException(
                error.message,
                error.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async findByVehicleId(vehicleId: number) {
        try {
            return await this.vehicleAssignmentRepository.find({
                where: { driver: { id: vehicleId } },
                relations: { driver: true, vehicle: true },
                order: { id: 'DESC' },
            });
        } catch (error) {
            this.logger.error(
                `Failed to find registers. Error: ${error.message}.`,
            );
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
            this.logger.error(
                `Failed to find registers. Error: ${error.message}.`,
            );
            throw new HttpException(
                error.message,
                error.status || HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
