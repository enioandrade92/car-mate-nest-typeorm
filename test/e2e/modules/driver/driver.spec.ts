import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { HttpException, INestApplication } from '@nestjs/common';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { VehicleModule } from '../../../../src/modules/vehicle/vehicle.module';
import { Driver } from '../../../../src/modules/driver/entities/driver.entity';
import { dataSource } from '../../../../src/lib/typeorm/database/data-source';

describe('Vehicle', () => {
    let nestApp: INestApplication;
    const mockNewDriver = {
        name: 'Jack',
    };
    const mockDriverRepository = {
        find: jest.fn(),
        findOne: jest.fn(),
        save: jest.fn(),
        update: jest.fn(),
        softDelete: jest.fn(),
        getRawMany: jest.fn(),
        createQueryBuilder: null,
    };

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [
                VehicleModule,
                TypeOrmModule.forRootAsync({
                    useFactory: () => dataSource,
                }),
            ],
        })
            .overrideProvider(getRepositoryToken(Driver))
            .useValue(mockDriverRepository)
            .compile();

        nestApp = moduleRef.createNestApplication();
        await nestApp.init();
    });

    describe('1 - Registering a new driver', () => {
        it('1.1 - Must return the driver saved with status 200', async () => {
            mockDriverRepository.findOne.mockReturnValue(null);
            const response = await request(nestApp.getHttpServer())
                .post('/driver')
                .send(mockNewDriver);

            console.log(response.request.url);
            expect(response.statusCode).toEqual(201);
            expect(response.body.data).toEqual({ id: 1, ...mockNewDriver });
        });
    });
});
