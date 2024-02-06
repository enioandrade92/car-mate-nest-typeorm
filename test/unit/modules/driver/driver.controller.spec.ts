import { Test, TestingModule } from '@nestjs/testing';

import { mockDriverService } from './mock-methods';
import { DriverController } from '../../../../src/modules/driver/driver.controller';
import { DriverService } from '../../../../src/modules/driver/driver.service';
import {
    mockCreateDriver,
    mockDriver,
    mockFilterDriver,
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
                    useValue: mockDriverService,
                },
            ],
        }).compile();

        controller = module.get<DriverController>(DriverController);
    });

    describe('1 - create method', () => {
        it('1.1 - should return a created driver', async () => {
            mockDriverService.createDriver.mockReturnValueOnce(mockDriver[0]);
            const response = await controller.createDriver(mockCreateDriver);
            expect(response).toStrictEqual(mockDriver[0]);
        });
    });

    describe('2 - update method', () => {
        it('2.1 - should return a updated driver', async () => {
            mockDriverService.updateDriver.mockReturnValueOnce({
                ...mockDriver[0],
                ...mockUpdateDriver,
            });
            const response = await controller.updateDriver(
                '1',
                mockUpdateDriver,
            );
            expect(response).toStrictEqual({
                ...mockDriver[0],
                ...mockUpdateDriver,
            });
        });
    });

    describe('3 - findAll method', () => {
        it('3.1 - should return a drivers', async () => {
            mockDriverService.findDriverByFilters.mockResolvedValueOnce(
                mockPaginateDrivers,
            );

            const response = await controller.findDriverByFilters(
                mockFilterDriver,
            );
            expect(response).toStrictEqual(mockPaginateDrivers);
        });
    });

    describe('4 - findOne method', () => {
        it('4.1 - should return a drivers', async () => {
            mockDriverService.findDriverById.mockResolvedValueOnce(
                mockDriver[0],
            );
            const response = await controller.findDriverById('1');
            expect(response).toStrictEqual(mockDriver[0]);
        });
    });

    describe('5 - remove method', () => {
        it('5.1 - should return a drivers', async () => {
            mockDriverService.removeDriver.mockResolvedValueOnce(
                'Deleted successfully the driver id 1',
            );
            const response = await controller.removeDriver('1');
            expect(response).toStrictEqual(
                'Deleted successfully the driver id 1',
            );
        });
    });
});
