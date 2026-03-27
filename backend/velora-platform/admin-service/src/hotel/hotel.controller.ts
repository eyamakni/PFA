import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Patch,
} from '@nestjs/common';
import { HotelService } from './hotel.service';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';

@Controller('admin/hotels')
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  @Post()
  create(@Body() dto: CreateHotelDto) {
    return this.hotelService.create(dto);
  }

  @Get()
  findAll() {
    return this.hotelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hotelService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateHotelDto) {
    return this.hotelService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hotelService.remove(+id);
  }
  
  @Patch(':id/restore')
restore(@Param('id') id: number) {
  return this.hotelService.restore(+id);
}
}