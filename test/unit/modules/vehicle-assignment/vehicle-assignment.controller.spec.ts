import { Test, TestingModule } from '@nestjs/testing';
import { VehicleAssignmentController } from '../../../../src/modules/vehicle-assignment/vehicle-assignment.controller';
import { VehicleAssignmentService } from '../../../../src/modules/vehicle-assignment/vehicle-assignment.service';
import { mockAssignmentService } from './mock-methods';
import { mockCreateRegister, mockRegisters } from './mock-data';

describe('VehicleAssignmentController', () => {
    let controller: VehicleAssignmentController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [VehicleAssignmentController],
            providers: [
                {
                    provide: VehicleAssignmentService,
                    useValue: mockAssignmentService,
                },
            ],
        }).compile();

        controller = module.get<VehicleAssignmentController>(
            VehicleAssignmentController,
        );
    });

    describe('1 - register method', () => {
        it('1.1 - should return a register', async () => {
            mockAssignmentService.register.mockReturnValueOnce(
                mockRegisters[0],
            );
            const response = await controller.register(mockCreateRegister);
            expect(response).toStrictEqual(mockRegisters[0]);
        });
    });

    describe('2 - registerFinish method', () => {
        it('2.1 - should return a register', async () => {
            mockAssignmentService.finish.mockReturnValueOnce(mockRegisters[1]);
            const response = await controller.registerFinish(
                mockCreateRegister,
            );
            expect(response).toStrictEqual(mockRegisters[1]);
        });
    });

    describe('3 - findByVehicleId method', () => {
        it('3.1 - should return a registers', async () => {
            mockAssignmentService.findByVehicleId.mockReturnValueOnce(
                mockRegisters,
            );
            const response = await controller.findByVehicleId('1');
            expect(response).toStrictEqual(mockRegisters);
        });
    });

    describe('4 - findByDriverId method', () => {
        it('4.1 - should return a registers', async () => {
            mockAssignmentService.findByDriverId.mockReturnValueOnce(
                mockRegisters,
            );
            const response = await controller.findByDriverId('1');
            expect(response).toStrictEqual(mockRegisters);
        });
    });
});
