export const mockDriverRepository = {
    findOne: jest.fn(),
    save: jest.fn(),
    softDelete: jest.fn(),
    findDriverByFilters: jest.fn(),
    createQueryBuilder: null,
};

export const mockDriverService = {
    createDriver: jest.fn(),
    updateDriver: jest.fn(),
    findDriverByFilters: jest.fn(),
    findDriverById: jest.fn(),
    removeDriver: jest.fn(),
};
