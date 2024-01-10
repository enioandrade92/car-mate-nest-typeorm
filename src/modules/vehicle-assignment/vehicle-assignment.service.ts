import {
    BadRequestException,
    HttpException,
    HttpStatus,
    Injectable,
    Logger,
    NotFoundException,
} from '@nestjs/common';
import { RegisterVehicleAssignmentDto } from './dto/register-vehicle-assignment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from '../vehicle/entities/vehicle.entity';
import { IsNull, Repository } from 'typeorm';
import { Driver } from '../driver/entities/driver.entity';
import { VehicleAssignment } from './entities/vehicle-assignment.entity';

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
    ) { }

    async register({
        driverId,
        vehicleId,
        reason,
    }: RegisterVehicleAssignmentDto) {
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
                const { plate } = register.vehicle;
                throw new BadRequestException(
                    `${name} driver  already has linked A ${plate} car`,
                );
            }

            const driver = await this.driverRepository.findOne({
                where: { id: driverId },
            });

            if (!driver) {
                throw new NotFoundException(`Not found driver: ${driverId}`);
            }
            const vehicle = await this.vehicleRepository.findOne({
                where: { id: vehicleId },
            });
            if (!vehicle) {
                throw new NotFoundException(`Not found vehicle: ${vehicleId}`);
            }
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
                `The ${vehicle.plate} car was linked to the ${driver.name} driver`,
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

    findAll() {
        return `This action returns all vehicleAssignment`;
    }

    findOne(id: number) {
        return `This action returns a #${id} vehicleAssignment`;
    }

    remove(id: number) {
        return `This action removes a #${id} vehicleAssignment`;
    }
}
