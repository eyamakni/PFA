import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Controller('reservations')
export class ReservationController {
  constructor(private readonly service: ReservationService) {}

  @Post()
  create(@Body() dto: CreateReservationDto) {
    return this.service.create(dto);
  }

  @Get('availability')
  checkAvailability(
    @Query('roomId') roomId: number,
    @Query('start') start: string,
    @Query('end') end: string,
  ) {
    return this.service.checkAvailability(roomId, start, end);
  }

  @Get('available-rooms')
  getAvailableRooms(
    @Query('start') start: string,
    @Query('end') end: string,
  ) {
    return this.service.findAvailableRooms(start, end);
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: number) {
    return this.service.findByUser(userId);
  }

  @Get('hotel/:hotelId')
  findByHotel(@Param('hotelId') hotelId: number) {
    return this.service.findByHotel(hotelId);
  }

  @Patch(':id/cancel')
  cancel(@Param('id') id: number) {
    return this.service.cancel(id);
  }
}