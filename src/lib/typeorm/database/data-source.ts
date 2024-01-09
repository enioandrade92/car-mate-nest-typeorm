import { DataSourceOptions } from 'typeorm';
import { Vehicle } from '../../../modules/vehicle/entities/vehicle.entity';
import { Driver } from '../../../modules/driver/entities/driver.entity';

export const dataSource: DataSourceOptions = {
    type: 'sqlite',
    database: '.db/sql',
    synchronize: true,
    entities: [Vehicle, Driver],
};
