import { Test, TestingModule } from '@nestjs/testing';
import { mockFilterVehicle, mockVehicleRepository } from './mock-methods';
import { VehicleAssignment } from '../../../../src/modules/vehicle-assignment/entities/vehicle-assignment.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
    mockCreateVehicle,
    mockUpdateVehicle,
    mockVehicles,
} from './mock-data';
import { VehicleService } from '../../../../src/modules/vehicle/vehicle.service';
import { Vehicle } from '../../../../src/modules/vehicle/entities/vehicle.entity';
import { VehicleRepository } from '../../../../src/modules/vehicle/repository/vehicle.repository';
import { HttpException } from '@nestjs/common';
import { mockRegisters } from '../vehicle-assignment/mock-data';

describe('VehicleService', () => {
    let service: VehicleService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                VehicleService,
                {
                    provide: getRepositoryToken(Vehicle),
                    useValue: mockVehicleRepository,
                },
                {
                    provide: getRepositoryToken(VehicleRepository),
                    useValue: mockVehicleRepository,
                },
                {
                    provide: getRepositoryToken(VehicleAssignment),
                    useValue: mockVehicleRepository,
                },
            ],
        }).compile();

        service = module.get<VehicleService>(VehicleService);
    });

    describe('1 - create method', () => {
        it('1.1 - should return an error when there is a vehicle with the plate', async () => {
            mockVehicleRepository.findOne.mockReturnValueOnce(mockVehicles[0]);
            const response = async () =>
                await service.create(mockCreateVehicle);
            expect(response).rejects.toThrow(
                'Already exists the vehicle plate abc123',
            );
        });

        it('1.2 - should return a created vehicle', async () => {
            mockVehicleRepository.findOne.mockReturnValueOnce(null);
            mockVehicleRepository.save.mockReturnValueOnce(mockVehicles[0]);
            const response = await service.create(mockCreateVehicle);
            expect(response).toStrictEqual(mockVehicles[0]);
        });
    });

    describe('2 - update method', () => {
        it('2.1 - should return an error when there is not a vehicle', async () => {
            mockVehicleRepository.findOne.mockReturnValueOnce(null);
            const response = async () =>
                await service.update(1, mockUpdateVehicle);
            expect(response).rejects.toThrow('Not found vehicle id 1');
        });
        it('2.2 - should return a updated driver', async () => {
            mockVehicleRepository.findOne.mockReturnValueOnce(mockVehicles[0]);
            mockVehicleRepository.save.mockReturnValueOnce({
                ...mockVehicles[0],
                ...mockUpdateVehicle,
            });
            const response = await service.update(1, mockUpdateVehicle);
            expect(response).toStrictEqual({
                ...mockVehicles[0],
                ...mockUpdateVehicle,
            });
        });
    });

    describe('3 - findAll method', () => {
        it('3.1 - when return an error', async () => {
            mockVehicleRepository.searchVehicle.mockRejectedValueOnce(
                'Error test',
            );
            const response = async () =>
                await service.findAll(mockFilterVehicle);
            expect(response).rejects.toThrow(HttpException);
        });
        it('3.2 - should return a vehicles blue color and fiat brand', async () => {
            mockVehicleRepository.searchVehicle.mockResolvedValueOnce(
                mockVehicles[0],
            );

            const response = await service.findAll(mockFilterVehicle);
            expect(response).toStrictEqual(mockVehicles[0]);
        });
        it('3.3 - should return a vehicles fiat brand', async () => {
            mockVehicleRepository.searchVehicle.mockResolvedValueOnce(
                mockVehicles,
            );

            const response = await service.findAll(mockFilterVehicle);
            expect(response).toStrictEqual(mockVehicles);
        });
        it('3.4 - should return a all vehicles', async () => {
            mockVehicleRepository.searchVehicle.mockResolvedValueOnce(
                mockVehicles,
            );

            const response = await service.findAll(null);
            expect(response).toStrictEqual(mockVehicles);
        });
    });

    describe('4 - findOne method', () => {
        it('4.1 - should return an error when there is not a vehicles', async () => {
            mockVehicleRepository.findOne.mockResolvedValueOnce(null);
            const response = async () => await service.findOne(1);
            expect(response).rejects.toThrow('Not found vehicle id 1');
        });
        it('4.2 - should return a drivers', async () => {
            mockVehicleRepository.findOne.mockResolvedValueOnce(
                mockVehicles[0],
            );
            const response = await service.findOne(1);
            expect(response).toStrictEqual(mockVehicles[0]);
        });
    });

    describe('5 - remove method', () => {
        it('5.1 - should return an error when there is a register', async () => {
            mockVehicleRepository.findOne.mockResolvedValueOnce(
                mockRegisters[0],
            );
            const error =
                'Finalize the link between the driver id 1 and the vehicle id 1 before deleting';
            const response = async () => await service.remove(1);
            expect(response).rejects.toThrow(error);
        });
        it('5.2 - should return a message "Deleted successfully the vehicle id"', async () => {
            mockVehicleRepository.findOne.mockResolvedValueOnce(null);
            mockVehicleRepository.softDelete.mockResolvedValueOnce(true);
            const response = await service.remove(1);
            expect(response).toStrictEqual(
                'Deleted successfully the vehicle id 1',
            );
        });
    });
});
