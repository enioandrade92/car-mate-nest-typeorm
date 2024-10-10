export const mockDriver = [
	{
		id: 1,
		name: 'Jack',
		createdAt: '2024-01-11T12:13:00.000Z',
		updatedAt: '2024-01-11T12:13:00.000Z',
		deletedAt: null,
	},
	{
		id: 2,
		name: 'Little Jack',
		createdAt: '2024-01-11T12:13:00.000Z',
		updatedAt: '2024-01-11T12:13:00.000Z',
		deletedAt: null,
	},
	{
		id: 3,
		name: 'Big Jack',
		createdAt: '2024-01-11T12:13:00.000Z',
		updatedAt: '2024-01-11T12:13:00.000Z',
		deletedAt: null,
	},
	{
		id: 4,
		name: 'Medium Jack',
		createdAt: '2024-01-11T12:13:00.000Z',
		updatedAt: '2024-01-11T12:13:00.000Z',
		deletedAt: null,
	},
];

export const mockPaginateDrivers = {
	items: mockDriver,
	meta: {
		totalItems: 4,
		itemCount: 4,
		itemsPerPage: 10,
		totalPages: 1,
		currentPage: 1,
	},
};

export const mockCreateDriver = {
	name: 'Jack',
};

export const mockUpdateDriver = {
	name: 'Jack Updated',
};

export const mockFilterDriver = {
	name: 'ja',
	page: 1,
	limit: 10,
};
