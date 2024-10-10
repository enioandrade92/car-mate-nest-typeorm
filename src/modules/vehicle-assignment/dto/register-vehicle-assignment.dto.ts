import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class RegisterVehicleDto {
	@IsInt()
	@IsNotEmpty()
	driverId: number;

	@IsInt()
	@IsNotEmpty()
	vehicleId: number;

	@IsString()
	@IsNotEmpty()
	reason: string;
}
