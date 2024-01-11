export const mockVehicleRepository = {
    findOne: jest.fn(),
    save: jest.fn(),
    softDelete: jest.fn(),
    searchVehicle: jest.fn(),
};

export const mockVehicleService = {
    create: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
};

export const mockFilterVehicle = {
    color: 'blue',
    brand: 'fiat',
};
