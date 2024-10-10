import { InjectRepository } from '@nestjs/typeorm';
import { Driver } from '../entities/driver.entity';
import { Repository } from 'typeorm';
import { IPaginationOptions, paginateRaw } from 'nestjs-typeorm-paginate';

export class DriverRepository extends Repository<Driver> {
	constructor(
		@InjectRepository(Driver) private driverRepository: Repository<Driver>,
	) {
		super(
			driverRepository.target,
			driverRepository.manager,
			driverRepository.queryRunner,
		);
	}

	async findDriverByFilters(name: string, paginate: IPaginationOptions) {
		const query = this.driverRepository.createQueryBuilder('drivers').select(`
                drivers.id,
                drivers.name,
                "drivers"."createdAt",
                "drivers"."updatedAt",
                "drivers"."deletedAt"
            `);
		if (name) {
			query.where('lower(drivers.name) like :name', {
				name: `%${name.toLowerCase()}%`,
			});
		}
		return paginateRaw(query, paginate);
	}
}
