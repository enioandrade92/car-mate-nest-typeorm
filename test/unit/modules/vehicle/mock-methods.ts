export const mockVehicleRepository = {
    findOne: jest.fn(),
    save: jest.fn(),
    softDelete: jest.fn(),
    findVehicleByFilters: jest.fn(),
    createQueryBuilder: null,
};

export const mockVehicleService = {
    createVehicle: jest.fn(),
    updateVehicle: jest.fn(),
    findVehicleByFilters: jest.fn(),
    findVehicleById: jest.fn(),
    removeVehicle: jest.fn(),
};

export const mockFilterVehicle = {
    color: 'blue',
    brand: 'fiat',
};
