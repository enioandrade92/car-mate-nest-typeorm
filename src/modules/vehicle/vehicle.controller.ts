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
    constructor(private readonly vehicleService: VehicleService) { }

    @Post()
    async create(@Body() createVehicleDto: CreateVehicleDto) {
        return this.vehicleService.create(createVehicleDto);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateVehicleDto: UpdateVehicleDto,
    ) {
        return this.vehicleService.update(+id, updateVehicleDto);
    }

    @Get()
    async findAll(@Query() filters?: FilterVehicleDto) {
        return this.vehicleService.findAll(filters);
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.vehicleService.findOne(+id);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.vehicleService.remove(+id);
    }
}
