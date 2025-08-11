import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationController, AdminController } from './controller';
import { ReservationService, NailService, StaffService } from './service';
import { Nail, Staff, Reservation, Owner } from './entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './service/reservation.auth.service';
import { AuthController } from './controller/reservation.auth.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Nail, Staff, Reservation, Owner]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [ReservationService, NailService, StaffService, AuthService],
  exports: [TypeOrmModule, ReservationService, NailService, StaffService, AuthService],
  controllers: [ReservationController, AdminController, AuthController],
})
export class ReservationModule {}
