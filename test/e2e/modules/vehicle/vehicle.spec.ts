// import * as request from 'supertest';
// import { Test } from '@nestjs/testing';
// import { HttpException, INestApplication } from '@nestjs/common';
// import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
// import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

// import { Driver } from 'src/modules/driver/entities/driver.entity';
// import { Vehicle } from 'src/modules/vehicle/entities/vehicle.entity';
// import { VehicleModule } from 'src/modules/vehicle/vehicle.module';

// describe('Vehicle', () => {
//     let nestApp: INestApplication;
//     const mockNewVehicle = {
//         name: 'onix',
//         color: 'white',
//         brand: 'chevrolet',
//         plate: 'abc1234',
//     };
//     const mockVehicleRepository = {
//         find: jest.fn(),
//         findOne: jest.fn(),
//         save: jest.fn(),
//         update: jest.fn(),
//         softDelete: jest.fn(),
//         getRawMany: jest.fn(),
//         createQueryBuilder: null,
//     };

//     beforeAll(async () => {
//         const moduleRef = await Test.createTestingModule({
//             imports: [
//                 VehicleModule,
//                 TypeOrmModule.forRootAsync({
//                     useFactory: () => {
//                         const sqliteOptions: SqliteConnectionOptions = {
//                             type: 'sqlite',
//                             database: ':memory:',
//                             entities: [Driver, Vehicle],
//                         };
//                         return {
//                             ...sqliteOptions,
//                         };
//                     },
//                 }),
//             ],
//         })
//             .overrideProvider(getRepositoryToken(Vehicle))
//             .useValue(mockVehicleRepository)
//             .compile()
//             .catch((err) => {
//                 console.error(err);
//                 throw err;
//             });
//         nestApp = moduleRef.createNestApplication();
//         await nestApp.init();
//     });

//     describe('1 - Registering a new vehicle', () => {
//         it('1.1 - Must return the vehicle saved with status 200', async () => {
//             mockVehicleRepository.createQueryBuilder = jest.fn(() => ({
//                 select: jest.fn().mockReturnThis(),
//                 innerJoin: jest.fn().mockReturnThis(),
//                 where: jest.fn().mockReturnThis(),
//                 orderBy: jest.fn().mockReturnThis(),
//                 getRawMany: jest.fn().mockReturnValueOnce(mockedAvatarList),
//             }));
//             const response = await request(nestApp.getHttpServer()).get(
//                 'vehicle',
//             );

//             expect(response.statusCode).toEqual(200);
//             expect(response.body.data).toEqual(mockedAvatarList);
//         });

//         it('Returns error with status 500', async () => {
//             mockVehicleRepository.createQueryBuilder = jest.fn(() => ({
//                 select: jest.fn().mockReturnThis(),
//                 innerJoin: jest.fn().mockReturnThis(),
//                 where: jest.fn().mockReturnThis(),
//                 orderBy: jest.fn().mockReturnThis(),
//                 getRawMany: jest
//                     .fn()
//                     .mockRejectedValueOnce(
//                         new HttpException('error test', 500),
//                     ),
//             }));
//             const response = await request(nestApp.getHttpServer()).get(
//                 'vehicle',
//             );

//             expect(response.statusCode).toEqual(500);
//             expect(response.body.message).toEqual('error test');
//         });
//     });
// });
