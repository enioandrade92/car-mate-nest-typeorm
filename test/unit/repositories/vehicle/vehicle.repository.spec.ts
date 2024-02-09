import { Test, TestingModule } from '@nestjs/testing';
import { paginateRaw } from 'nestjs-typeorm-paginate';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
    mockFilterVehicle,
    mockVehicleRepository,
} from '../../modules/vehicle/mock-methods';
import { VehicleRepository } from '../../../../src/modules/vehicle/repository/vehicle.repository';
import { Vehicle } from '../../../../src/modules/vehicle/entities/vehicle.entity';
import { mockVehicles } from '../../modules/vehicle/mock-data';

jest.mock('nestjs-typeorm-paginate', () => ({
    paginateRaw: jest.fn(),
}));
(paginateRaw as jest.Mock).mockResolvedValueOnce(mockFilterVehicle);

describe('VehicleRepository', () => {
    let repository: VehicleRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                VehicleRepository,
                {
                    provide: getRepositoryToken(Vehicle),
                    useValue: mockVehicleRepository,
                },
            ],
        }).compile();

        repository = module.get<VehicleRepository>(VehicleRepository);
    });

    describe('1 - searchVehicle method', () => {
        it('1.1 - should return a vehicles', async () => {
            mockVehicleRepository.createQueryBuilder = jest.fn(() => ({
                andWhere: jest.fn().mockReturnThis(),
                getMany: jest.fn().mockReturnValue(mockVehicles),
            }));

            const response = await repository.findVehicleByFilters(
                mockFilterVehicle,
            );
            expect(response).toStrictEqual(mockVehicles);
        });
    });
});
