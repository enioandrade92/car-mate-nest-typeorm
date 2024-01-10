import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class RegisterVehicleAssignmentDto {
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
