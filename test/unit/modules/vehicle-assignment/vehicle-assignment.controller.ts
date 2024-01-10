import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VehicleAssignmentService } from './vehicle-assignment.service';
import { CreateVehicleAssignmentDto } from './dto/create-vehicle-assignment.dto';
import { UpdateVehicleAssignmentDto } from './dto/update-vehicle-assignment.dto';

@Controller('vehicle-assignment')
export class VehicleAssignmentController {
  constructor(private readonly vehicleAssignmentService: VehicleAssignmentService) {}

  @Post()
  create(@Body() createVehicleAssignmentDto: CreateVehicleAssignmentDto) {
    return this.vehicleAssignmentService.create(createVehicleAssignmentDto);
  }

  @Get()
  findAll() {
    return this.vehicleAssignmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vehicleAssignmentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVehicleAssignmentDto: UpdateVehicleAssignmentDto) {
    return this.vehicleAssignmentService.update(+id, updateVehicleAssignmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vehicleAssignmentService.remove(+id);
  }
}
