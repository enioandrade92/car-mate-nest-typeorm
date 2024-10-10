import { Test, TestingModule } from '@nestjs/testing';
import { DriverService } from '../../../../src/modules/driver/driver.service';
import { Driver } from '../../../../src/modules/driver/entities/driver.entity';
import { mockDriverRepository } from './mock-methods';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DriverRepository } from '../../../../src/modules/driver/repository/driver.repository';
import {
	mockCreateDriver,
	mockDriver,
	mockFilterDriver,
	mockPaginateDrivers,
	mockUpdateDriver,
} from './mock-data';
import { HttpException } from '@nestjs/common';
import { mockRegisters } from '../vehicle-assignment/mock-data';
import { VehicleAssignment } from '../../../../src/modules/vehicle-assignment/entities/vehicle-assignment.entity';

describe('DriverService', () => {
	let service: DriverService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				DriverService,
				{
					provide: getRepositoryToken(Driver),
					useValue: mockDriverRepository,
				},
				{
					provide: getRepositoryToken(DriverRepository),
					useValue: mockDriverRepository,
				},
				{
					provide: getRepositoryToken(VehicleAssignment),
					useValue: mockDriverRepository,
				},
			],
		}).compile();

		service = module.get<DriverService>(DriverService);
	});

	describe('1 - create method', () => {
		it('1.1 - should return an error when there is a driver with the name', async () => {
			mockDriverRepository.findOne.mockReturnValueOnce(mockDriver[0]);
			const response = async () => await service.createDriver(mockCreateDriver);
			expect(response).rejects.toThrow('Already exists the driver: Jack');
		});

		it('1.2 - should return a created driver', async () => {
			mockDriverRepository.findOne.mockReturnValueOnce(null);
			mockDriverRepository.save.mockReturnValueOnce(mockDriver[0]);
			const response = await service.createDriver(mockCreateDriver);
			expect(response).toStrictEqual(mockDriver[0]);
		});
	});

	describe('2 - update method', () => {
		it('2.1 - should return an error when there is not a driver', async () => {
			mockDriverRepository.findOne.mockReturnValueOnce(null);
			const response = async () =>
				await service.updateDriver(1, mockUpdateDriver);
			expect(response).rejects.toThrow('Not found driver id 1');
		});
		it('2.2 - should return a updated driver', async () => {
			mockDriverRepository.findOne.mockReturnValueOnce(mockDriver[0]);
			mockDriverRepository.save.mockReturnValueOnce({
				...mockDriver[0],
				...mockUpdateDriver,
			});
			const response = await service.updateDriver(1, mockUpdateDriver);
			expect(response).toStrictEqual({
				...mockDriver[0],
				...mockUpdateDriver,
			});
		});
	});

	describe('3 - findAll method', () => {
		it('3.1 - when return an error', async () => {
			mockDriverRepository.findDriverByFilters.mockRejectedValueOnce(
				'Error test',
			);
			const response = async () =>
				await service.findDriverByFilters(mockFilterDriver);
			expect(response).rejects.toThrow(HttpException);
		});
		it('3.2 - should return a drivers', async () => {
			mockDriverRepository.findDriverByFilters.mockResolvedValueOnce(
				mockPaginateDrivers,
			);

			const response = await service.findDriverByFilters(mockFilterDriver);
			expect(response).toStrictEqual(mockPaginateDrivers);
		});
	});

	describe('4 - findOne method', () => {
		it('4.1 - should return an error when there is not a driver', async () => {
			mockDriverRepository.findOne.mockResolvedValueOnce(null);
			const response = async () => await service.findDriverById(1);
			expect(response).rejects.toThrow('Not found driver id 1');
		});
		it('4.2 - should return a drivers', async () => {
			mockDriverRepository.findOne.mockResolvedValueOnce(mockDriver[0]);
			const response = await service.findDriverById(1);
			expect(response).toStrictEqual(mockDriver[0]);
		});
	});

	describe('5 - remove method', () => {
		it('5.1 - should return an error when there is a register', async () => {
			mockDriverRepository.findOne.mockResolvedValueOnce(mockRegisters[0]);
			const error =
				'Finalize the link between the driver id 1 and the vehicle id 1 before deleting';
			const response = async () => await service.removeDriver(1);
			expect(response).rejects.toThrow(error);
		});
		it('5.2 - should return a message "Deleted successfully the driver id"', async () => {
			mockDriverRepository.findOne.mockResolvedValueOnce(null);
			mockDriverRepository.softDelete.mockResolvedValueOnce(true);
			const response = await service.removeDriver(1);
			expect(response).toStrictEqual('Deleted successfully the driver id 1');
		});
	});
});
