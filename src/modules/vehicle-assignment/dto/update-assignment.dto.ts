import { PartialType } from '@nestjs/mapped-types';
import { RegisterVehicleDto } from './register-vehicle-assignment.dto';

export class UpdateAssignmentDto extends PartialType(RegisterVehicleDto) {}
