import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Query,
    Put,
} from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { FilterVehicleDto } from './dto/filter-vehicle.dto';

@Controller('vehicle')
export class VehicleController {
    constructor(private readonly vehicleService: VehicleService) {}

    @Post()
    async createVehicle(@Body() createVehicleDto: CreateVehicleDto) {
        return this.vehicleService.createVehicle(createVehicleDto);
    }

    @Put(':id')
    async updateVehicle(
        @Param('id') id: string,
        @Body() updateVehicleDto: UpdateVehicleDto,
    ) {
        return this.vehicleService.updateVehicle(+id, updateVehicleDto);
    }

    @Get()
    async findVehicleByFilters(@Query() filters?: FilterVehicleDto) {
        return this.vehicleService.findVehicleByFilters(filters);
    }

    @Get(':id')
    async findVehicleById(@Param('id') id: string) {
        return this.vehicleService.findVehicleById(+id);
    }

    @Delete(':id')
    async removeVehicle(@Param('id') id: string) {
        return this.vehicleService.removeVehicle(+id);
    }
}
