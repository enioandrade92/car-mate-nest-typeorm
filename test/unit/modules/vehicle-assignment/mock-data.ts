export const mockRegisters = [
	{
		id: 3,
		reason: 'trip',
		startDateAssignment: '2024-01-11T12:23:06.799Z',
		endDateAssignment: null,
		driver: {
			id: 1,
			name: 'Jack',
			createdAt: '2024-01-11T12:13:00.000Z',
			updatedAt: '2024-01-11T12:13:00.000Z',
			deletedAt: null,
		},
		vehicle: {
			id: 1,
			name: 'Uno',
			color: 'blue',
			brand: 'Fiat',
			plate: 'abc123',
			createdAt: '2024-01-11T12:14:30.000Z',
			updatedAt: '2024-01-11T12:14:30.000Z',
			deletedAt: null,
		},
	},
	{
		id: 2,
		reason: 'trip',
		startDateAssignment: '2024-01-11T12:23:01.677Z',
		endDateAssignment: '2024-01-11T12:23:04.214Z',
		driver: {
			id: 1,
			name: 'Jack',
			createdAt: '2024-01-11T12:13:00.000Z',
			updatedAt: '2024-01-11T12:13:00.000Z',
			deletedAt: null,
		},
		vehicle: {
			id: 1,
			name: 'Uno',
			color: 'blue',
			brand: 'Fiat',
			plate: 'abc123',
			createdAt: '2024-01-11T12:14:30.000Z',
			updatedAt: '2024-01-11T12:14:30.000Z',
			deletedAt: null,
		},
	},
	{
		id: 1,
		reason: 'trip',
		startDateAssignment: '2024-01-11T12:15:28.959Z',
		endDateAssignment: '2024-01-11T12:18:51.529Z',
		driver: {
			id: 1,
			name: 'Jack',
			createdAt: '2024-01-11T12:13:00.000Z',
			updatedAt: '2024-01-11T12:13:00.000Z',
			deletedAt: null,
		},
		vehicle: {
			id: 1,
			name: 'Uno',
			color: 'blue',
			brand: 'Fiat',
			plate: 'abc123',
			createdAt: '2024-01-11T12:14:30.000Z',
			updatedAt: '2024-01-11T12:14:30.000Z',
			deletedAt: null,
		},
	},
];

export const mockCreateRegister = {
	driverId: 1,
	vehicleId: 1,
	reason: 'trip',
};

export const mockFinishRegister = {
	driverId: 1,
	vehicleId: 1,
};
