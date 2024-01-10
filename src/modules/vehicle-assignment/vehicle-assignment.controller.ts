import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { VehicleAssignmentService } from './vehicle-assignment.service';
import { RegisterVehicleAssignmentDto } from './dto/register-vehicle-assignment.dto';

@Controller('vehicle-assignment')
export class VehicleAssignmentController {
    constructor(
        private readonly vehicleAssignmentService: VehicleAssignmentService,
    ) { }

    @Post('register')
    async register(
        @Body() RegisterVehicleAssignmentDto: RegisterVehicleAssignmentDto,
    ) {
        return this.vehicleAssignmentService.register(
            RegisterVehicleAssignmentDto,
        );
    }

    @Get()
    async findAll() {
        return this.vehicleAssignmentService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.vehicleAssignmentService.findOne(+id);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.vehicleAssignmentService.remove(+id);
    }
}
