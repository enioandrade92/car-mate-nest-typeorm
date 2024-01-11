export const mockAssignmentRepository = {
    findOne: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    createQueryBuilder: null,
};

export const mockAssignmentService = {
    register: jest.fn(),
    finish: jest.fn(),
    findByDriverId: jest.fn(),
    findByVehicleId: jest.fn(),
    findByDriverName: jest.fn(),
};
