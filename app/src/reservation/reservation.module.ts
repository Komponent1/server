import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationController, AdminController } from './controller';
import { ReservationService, NailService, StaffService } from './service';
import { Nail, Staff, Reservation } from './entity';

@Module({
  imports: [TypeOrmModule.forFeature([Nail, Staff, Reservation])],
  providers: [ReservationService, NailService, StaffService],
  exports: [TypeOrmModule, ReservationService, NailService, StaffService],
  controllers: [ReservationController, AdminController],
})
export class ReservationModule {}
