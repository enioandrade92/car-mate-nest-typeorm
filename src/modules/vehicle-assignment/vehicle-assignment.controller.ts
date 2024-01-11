import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Put,
} from '@nestjs/common';
import { VehicleAssignmentService } from './vehicle-assignment.service';
import { RegisterVehicleDto } from './dto/register-vehicle-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';

@Controller('vehicle-assignment')
export class VehicleAssignmentController {
    constructor(
        private readonly vehicleAssignmentService: VehicleAssignmentService,
    ) { }

    @Post('register')
    async register(@Body() RegisterVehicleAssignment: RegisterVehicleDto) {
        return this.vehicleAssignmentService.register(
            RegisterVehicleAssignment,
        );
    }

    @Put()
    async registerFinish(@Body() updateAssignment: UpdateAssignmentDto) {
        return this.vehicleAssignmentService.finish(updateAssignment);
    }

    @Get('vehicle/:id')
    async findByVehicleId(@Param('id') id: string) {
        return this.vehicleAssignmentService.findByVehicleId(+id);
    }

    @Get('driver/:id')
    async findByDriverId(@Param('id') id: string) {
        return this.vehicleAssignmentService.findByDriverId(+id);
    }
}
