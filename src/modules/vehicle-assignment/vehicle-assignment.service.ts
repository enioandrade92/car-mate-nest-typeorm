import { Injectable } from '@nestjs/common';
import { CreateVehicleAssignmentDto } from './dto/create-vehicle-assignment.dto';
import { UpdateVehicleAssignmentDto } from './dto/update-vehicle-assignment.dto';

@Injectable()
export class VehicleAssignmentService {
  create(createVehicleAssignmentDto: CreateVehicleAssignmentDto) {
    return 'This action adds a new vehicleAssignment';
  }

  findAll() {
    return `This action returns all vehicleAssignment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vehicleAssignment`;
  }

  update(id: number, updateVehicleAssignmentDto: UpdateVehicleAssignmentDto) {
    return `This action updates a #${id} vehicleAssignment`;
  }

  remove(id: number) {
    return `This action removes a #${id} vehicleAssignment`;
  }
}
