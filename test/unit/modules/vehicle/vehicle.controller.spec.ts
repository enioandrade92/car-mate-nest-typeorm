import { Test, TestingModule } from '@nestjs/testing';
import { VehicleController } from '../../../../src/modules/vehicle/vehicle.controller';
import { VehicleService } from '../../../../src/modules/vehicle/vehicle.service';
import { mockFilterVehicle, mockVehicleService } from './mock-methods';
import {
    mockCreateVehicle,
    mockVehicles,
    mockUpdateVehicle,
} from './mock-data';

describe('VehicleController', () => {
    let controller: VehicleController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [VehicleController],
            providers: [
                {
                    provide: VehicleService,
                    useValue: mockVehicleService,
                },
            ],
        }).compile();

        controller = module.get<VehicleController>(VehicleController);
    });

    describe('1 - create method', () => {
        it('1.1 - should return a created vehicle', async () => {
            mockVehicleService.create.mockReturnValueOnce(mockVehicles[0]);
            const response = await controller.create(mockCreateVehicle);
            expect(response).toStrictEqual(mockVehicles[0]);
        });
    });

    describe('2 - update method', () => {
        it('2.1 - should return a updated driver', async () => {
            mockVehicleService.findOne.mockReturnValueOnce(mockVehicles[0]);
            mockVehicleService.update.mockReturnValueOnce({
                ...mockVehicles[0],
                ...mockUpdateVehicle,
            });
            const response = await controller.update('1', mockUpdateVehicle);
            expect(response).toStrictEqual({
                ...mockVehicles[0],
                ...mockUpdateVehicle,
            });
        });
    });

    describe('3 - findAll method', () => {
        it('3.1 - should return a vehicles blue color and fiat brand', async () => {
            mockVehicleService.findAll.mockResolvedValueOnce(mockVehicles[0]);

            const response = await controller.findAll(mockFilterVehicle);
            expect(response).toStrictEqual(mockVehicles[0]);
        });
        it('3.2 - should return a vehicles fiat brand', async () => {
            mockVehicleService.findAll.mockResolvedValueOnce(mockVehicles);

            const response = await controller.findAll(mockFilterVehicle);
            expect(response).toStrictEqual(mockVehicles);
        });
        it('3.3 - should return a all vehicles', async () => {
            mockVehicleService.findAll.mockResolvedValueOnce(mockVehicles);

            const response = await controller.findAll(null);
            expect(response).toStrictEqual(mockVehicles);
        });
    });

    describe('4 - findOne method', () => {
        it('4.1 - should return a drivers', async () => {
            mockVehicleService.findOne.mockResolvedValueOnce(mockVehicles[0]);
            const response = await controller.findOne(1);
            expect(response).toStrictEqual(mockVehicles[0]);
        });
    });

    describe('5 - remove method', () => {
        it('5.1 - should return a message "Deleted successfully the vehicle id"', async () => {
            const message = 'Deleted successfully the vehicle id 1';
            mockVehicleService.remove.mockResolvedValueOnce(message);
            const response = await controller.remove('1');
            expect(response).toStrictEqual(message);
        });
    });
});
