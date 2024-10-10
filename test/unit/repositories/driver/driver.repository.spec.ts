import { Test, TestingModule } from '@nestjs/testing';
import { paginateRaw } from 'nestjs-typeorm-paginate';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Driver } from '../../../../src/modules/driver/entities/driver.entity';
import { mockDriverRepository } from '../../modules/driver/mock-methods';
import { mockDriver, mockFilterDriver } from '../../modules/driver/mock-data';
import { DriverRepository } from '../../../../src/modules/driver/repository/driver.repository';
jest.mock('nestjs-typeorm-paginate', () => ({
	paginateRaw: jest.fn(),
}));
describe('DriverRepository', () => {
	let repository: DriverRepository;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				DriverRepository,
				{
					provide: getRepositoryToken(Driver),
					useValue: mockDriverRepository,
				},
			],
		}).compile();

		repository = module.get<DriverRepository>(DriverRepository);
	});

	describe('1 - searchDriver method', () => {
		it('1.1 - should return a vehicles', async () => {
			mockDriverRepository.createQueryBuilder = jest.fn(() => ({
				select: jest.fn().mockReturnThis(),
				where: jest.fn().mockReturnThis(),
			}));
			(paginateRaw as jest.Mock).mockResolvedValueOnce(mockDriver);

			const { name, ...paginate } = mockFilterDriver;
			const response = await repository.findDriverByFilters(name, paginate);
			expect(response).toStrictEqual(mockDriver);
		});
	});
});
