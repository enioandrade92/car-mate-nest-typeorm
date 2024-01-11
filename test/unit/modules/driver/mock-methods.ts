export const mockDriverRepository = {
    findOne: jest.fn(),
    save: jest.fn(),
    softDelete: jest.fn(),
    searchDriver: jest.fn(),
};

export const mockServiceDriver = {
    create: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
};
