import { BaseEntity, Repository } from 'typeorm';
import { IPaginationOptions, paginateRaw } from 'nestjs-typeorm-paginate';
import { InterfaceRepository } from '../lib/typeorm/database/interfaces/repository.interface';

export class BaseRepository implements InterfaceRepository {
	constructor(protected repository: Repository<any>) {}
	async create(payload: any): Promise<any> {
		return await this.repository.save(payload);
	}
	async update(entity: BaseEntity, payload: any): Promise<any> {
		return await this.repository.save({ ...entity, ...payload });
	}

	async findById(id: number): Promise<any> {
		return await this.repository.findOne({
			where: { id },
		});
	}

	async findByName(name: string): Promise<any> {
		return await this.repository.findOne({
			where: { name },
		});
	}
	async findAll(Paginate: IPaginationOptions): Promise<any> {
		const query = this.repository.createQueryBuilder();
		return paginateRaw(query, Paginate);
	}

	async softDelete(id: number): Promise<any> {
		return await this.repository.softDelete(id);
	}
}
