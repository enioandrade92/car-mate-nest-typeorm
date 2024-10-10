import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	Put,
	Query,
	UseGuards,
} from '@nestjs/common';
import { DriverService } from './driver.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { FilterDriverDto } from './dto/filter-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('driver')
export class DriverController {
	constructor(private readonly driverService: DriverService) {}

	@Post()
	async createDriver(@Body() createDriverDto: CreateDriverDto) {
		return this.driverService.createDriver(createDriverDto);
	}

	@Put(':id')
	updateDriver(
		@Param('id') id: string,
		@Body() updateDriverDto: UpdateDriverDto,
	) {
		return this.driverService.updateDriver(+id, updateDriverDto);
	}

	@Get()
	findDriverByFilters(@Query() queryString: FilterDriverDto) {
		return this.driverService.findDriverByFilters(queryString);
	}

	@Get(':id')
	findDriverById(@Param('id') id: string) {
		return this.driverService.findDriverById(+id);
	}

	@Delete(':id')
	removeDriver(@Param('id') id: string) {
		return this.driverService.removeDriver(+id);
	}
}
