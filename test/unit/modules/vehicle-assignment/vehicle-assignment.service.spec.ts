import { Test, TestingModule } from '@nestjs/testing';
import { VehicleAssignmentService } from '../../../../src/modules/vehicle-assignment/vehicle-assignment.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Vehicle } from '../../../../src/modules/vehicle/entities/vehicle.entity';
import { mockVehicleRepository } from '../vehicle/mock-methods';
import { Driver } from '../../../../src/modules/driver/entities/driver.entity';
import { mockDriverRepository } from '../driver/mock-methods';
import { VehicleAssignment } from '../../../../src/modules/vehicle-assignment/entities/vehicle-assignment.entity';
import { mockAssignmentRepository } from './mock-methods';
import { mockCreateRegister, mockRegisters } from './mock-data';
import { mockVehicles } from '../vehicle/mock-data';
import { mockDriver } from '../driver/mock-data';
import { HttpException } from '@nestjs/common';

describe('VehicleAssignmentService', () => {
	let service: VehicleAssignmentService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				VehicleAssignmentService,
				{
					provide: getRepositoryToken(Vehicle),
					useValue: mockVehicleRepository,
				},
				{
					provide: getRepositoryToken(Driver),
					useValue: mockDriverRepository,
				},
				{
					provide: getRepositoryToken(VehicleAssignment),
					useValue: mockAssignmentRepository,
				},
			],
		}).compile();

		service = module.get<VehicleAssignmentService>(VehicleAssignmentService);
	});

	describe('1 - register method', () => {
		it('1.1 - should return an error when there is a register', async () => {
			mockAssignmentRepository.createQueryBuilder = jest.fn(() => ({
				innerJoinAndSelect: jest.fn().mockReturnThis(),
				where: jest.fn().mockReturnThis(),
				andWhere: jest.fn().mockReturnThis(),
				getMany: jest.fn().mockReturnValueOnce(mockRegisters),
			}));
			const response = async () => await service.register(mockCreateRegister);
			expect(response).rejects.toThrow(
				'Jack driver already has linked a vehicle id 1',
			);
		});

		it('1.2 - should return an error when there is not the vehicle', async () => {
			mockAssignmentRepository.createQueryBuilder = jest.fn(() => ({
				innerJoinAndSelect: jest.fn().mockReturnThis(),
				where: jest.fn().mockReturnThis(),
				andWhere: jest.fn().mockReturnThis(),
				getMany: jest.fn().mockReturnValueOnce([]),
			}));
			mockDriverRepository.findOne.mockReturnValueOnce(null);

			const response = async () => await service.register(mockCreateRegister);
			expect(response).rejects.toThrow('Not found driver id 1');
		});

		it('1.3 - should return an error when there is not the driver', async () => {
			mockAssignmentRepository.createQueryBuilder = jest.fn(() => ({
				innerJoinAndSelect: jest.fn().mockReturnThis(),
				where: jest.fn().mockReturnThis(),
				andWhere: jest.fn().mockReturnThis(),
				getMany: jest.fn().mockReturnValueOnce([]),
			}));
			mockDriverRepository.findOne.mockReturnValueOnce(mockVehicles[0]);
			mockVehicleRepository.findOne.mockReturnValueOnce(null);

			const response = async () => await service.register(mockCreateRegister);
			expect(response).rejects.toThrow('Not found vehicle id 1');
		});

		it('1.4 - should return a register', async () => {
			mockAssignmentRepository.createQueryBuilder = jest.fn(() => ({
				innerJoinAndSelect: jest.fn().mockReturnThis(),
				where: jest.fn().mockReturnThis(),
				andWhere: jest.fn().mockReturnThis(),
				getMany: jest.fn().mockReturnValueOnce([]),
			}));
			mockDriverRepository.findOne.mockReturnValueOnce(mockDriver[0]);
			mockVehicleRepository.findOne.mockReturnValueOnce(mockVehicles[0]);
			mockAssignmentRepository.save.mockReturnValueOnce(mockRegisters[0]);
			const response = await service.register(mockCreateRegister);
			expect(response).toStrictEqual(mockRegisters[0]);
		});
	});

	describe('2 - finish method', () => {
		it('2.1 - should return an error when there is not a register', async () => {
			mockAssignmentRepository.findOne.mockReturnValueOnce(null);
			const response = async () => await service.finish(mockCreateRegister);
			expect(response).rejects.toThrow(
				'driver id 1 does not have a linked vehicle',
			);
		});

		it('2.2 - should return a register', async () => {
			mockAssignmentRepository.findOne.mockReturnValueOnce(mockRegisters[1]);
			mockAssignmentRepository.save.mockReturnValueOnce(mockRegisters[1]);
			const response = await service.finish(mockCreateRegister);
			expect(response).toStrictEqual(mockRegisters[1]);
		});
	});

	describe('3 - findByVehicleId method', () => {
		it('3.1 - when return an error', async () => {
			mockAssignmentRepository.find.mockRejectedValueOnce('Error test');
			const response = async () => await service.findByVehicleId(1);
			expect(response).rejects.toThrow(HttpException);
		});

		it('3.2 - should return a registers', async () => {
			mockAssignmentRepository.find.mockReturnValueOnce(mockRegisters);
			const response = await service.findByVehicleId(1);
			expect(response).toStrictEqual(mockRegisters);
		});
	});

	describe('4 - findByDriverId method', () => {
		it('4.1 - when return an error', async () => {
			mockAssignmentRepository.find.mockRejectedValueOnce('Error test');
			const response = async () => await service.findByDriverId(1);
			expect(response).rejects.toThrow(HttpException);
		});

		it('4.2 - should return a registers', async () => {
			mockAssignmentRepository.find.mockReturnValueOnce(mockRegisters);
			const response = await service.findByDriverId(1);
			expect(response).toStrictEqual(mockRegisters);
		});
	});

	describe('5 - findByDriverName method', () => {
		it('5.1 - when return an error', async () => {
			mockAssignmentRepository.find.mockRejectedValueOnce('Error test');
			const response = async () => await service.findByDriverName('Jack');
			expect(response).rejects.toThrow(HttpException);
		});

		it('5.2 - should return a registers', async () => {
			mockAssignmentRepository.find.mockReturnValueOnce(mockRegisters);
			const response = await service.findByDriverName('Jack');
			expect(response).toStrictEqual(mockRegisters);
		});
	});
});
