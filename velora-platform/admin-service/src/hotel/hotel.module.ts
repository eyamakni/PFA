import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hotel } from './hotel.entity';
import { HotelService } from './hotel.service';
import { HotelController } from './hotel.controller';
import { Room } from 'src/room/room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Hotel, Room])],
  controllers: [HotelController],
  providers: [HotelService],
})
export class HotelModule {}