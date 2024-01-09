import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Put,
    Query,
} from '@nestjs/common';
import { DriverService } from './driver.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { FilterFindDto } from './dto/filter-find.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';

@Controller('driver')
export class DriverController {
    constructor(private readonly driverService: DriverService) { }

    @Post()
    async create(@Body() createDriverDto: CreateDriverDto) {
        return this.driverService.create(createDriverDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateDriverDto: UpdateDriverDto) {
        return this.driverService.update(+id, updateDriverDto);
    }

    @Get()
    findAll(@Query() queryString: FilterFindDto) {
        return this.driverService.findAll(queryString);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.driverService.findOne(+id);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.driverService.remove(+id);
    }
}
