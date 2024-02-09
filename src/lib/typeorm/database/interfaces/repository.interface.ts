import { IPaginationOptions } from 'nestjs-typeorm-paginate';

export interface InterfaceRepository {
    create(payload: any): Promise<any>;
    update(entity: any, payload: any): Promise<any>;
    findById(id: number): Promise<any>;
    findAll(Paginate: IPaginationOptions): Promise<any>;
    softDelete(id: number): Promise<any>;
}
