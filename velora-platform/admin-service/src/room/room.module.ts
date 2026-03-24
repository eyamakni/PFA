import { Module } from '@nestjs/common';
import { Room } from './room.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { Hotel } from 'src/hotel/hotel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Room, Hotel])],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}