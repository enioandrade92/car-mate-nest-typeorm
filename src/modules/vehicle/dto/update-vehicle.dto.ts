import { PartialType } from '@nestjs/mapped-types';
import { CreateVehicleDto } from './create-vehicle.dto';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateVehicleDto extends PartialType(CreateVehicleDto) {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    color: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    brand: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    plate: string;
}
