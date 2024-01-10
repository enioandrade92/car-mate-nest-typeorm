import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from '../entities/vehicle.entity';
import { FilterVehicleDto } from '../dto/filter-vehicle.dto';

export class VehicleRepository extends Repository<Vehicle> {
    constructor(
        @InjectRepository(Vehicle)
        private vehicleRepository: Repository<Vehicle>,
    ) {
        super(
            vehicleRepository.target,
            vehicleRepository.manager,
            vehicleRepository.queryRunner,
        );
    }

    async searchVehicle(filters: FilterVehicleDto) {
        const query = this.vehicleRepository.createQueryBuilder('vehicles');
        const keysAndValues = Object.entries(filters);
        if (keysAndValues.length) {
            keysAndValues.forEach(
                ([key, value]: [key: string, value: string]) => {
                    if (['brand', 'color'].includes(key)) {
                        query.andWhere(
                            `LOWER(vehicles.${key}) = '${value.toLowerCase()}'`,
                        );
                    }
                },
            );
        }
        return query.getMany();
    }
}
