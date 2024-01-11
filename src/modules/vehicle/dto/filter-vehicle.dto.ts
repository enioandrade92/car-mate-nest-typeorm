import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class FilterVehicleDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    color?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    brand?: string;
}
