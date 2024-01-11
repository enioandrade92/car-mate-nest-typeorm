import { Test, TestingModule } from '@nestjs/testing';

import { mockServiceDriver } from './mock-methods';
import { DriverController } from '../../../../src/modules/driver/driver.controller';
import { DriverService } from '../../../../src/modules/driver/driver.service';
import {
    mockCreateDriver,
    mockDriver,
    mockFilter,
    mockPaginateDrivers,
    mockUpdateDriver,
} from './mock-data';

describe('DriverController', () => {
    let controller: DriverController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [DriverController],
            providers: [
                {
                    provide: DriverService,
                    useValue: mockServiceDriver,
                },
            ],
        }).compile();

        controller = module.get<DriverController>(DriverController);
    });

    describe('1 - create method', () => {
        it('1.1 - should return a created driver', async () => {
            mockServiceDriver.create.mockReturnValueOnce(mockDriver[0]);
            const response = await controller.create(mockCreateDriver);
            expect(response).toStrictEqual(mockDriver[0]);
        });
    });

    describe('2 - update method', () => {
        it('2.1 - should return a updated driver', async () => {
            mockServiceDriver.update.mockReturnValueOnce({
                ...mockDriver[0],
                ...mockUpdateDriver,
            });
            const response = await controller.update('1', mockUpdateDriver);
            expect(response).toStrictEqual({
                ...mockDriver[0],
                ...mockUpdateDriver,
            });
        });
    });

    describe('3 - findAll method', () => {
        it('3.1 - should return a drivers', async () => {
            mockServiceDriver.findAll.mockResolvedValueOnce(
                mockPaginateDrivers,
            );

            const response = await controller.findAll(mockFilter);
            expect(response).toStrictEqual(mockPaginateDrivers);
        });
    });

    describe('4 - findOne method', () => {
        it('4.1 - should return a drivers', async () => {
            mockServiceDriver.findOne.mockResolvedValueOnce(mockDriver[0]);
            const response = await controller.findOne('1');
            expect(response).toStrictEqual(mockDriver[0]);
        });
    });

    describe('5 - remove method', () => {
        it('5.1 - should return a drivers', async () => {
            mockServiceDriver.remove.mockResolvedValueOnce(
                'Deleted successfully the driver id 1',
            );
            const response = await controller.remove('1');
            expect(response).toStrictEqual(
                'Deleted successfully the driver id 1',
            );
        });
    });
});
