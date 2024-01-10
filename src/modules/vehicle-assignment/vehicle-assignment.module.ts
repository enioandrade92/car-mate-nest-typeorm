import { Module } from '@nestjs/common';
import { VehicleAssignmentService } from './vehicle-assignment.service';
import { VehicleAssignmentController } from './vehicle-assignment.controller';

@Module({
  controllers: [VehicleAssignmentController],
  providers: [VehicleAssignmentService]
})
export class VehicleAssignmentModule {}
