import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import {} from '../exception/reservation.exception';
import { ReservationService } from '../service';
import { Reservation } from '../entity';
import { CreateReservationRequest } from '../dto/reservation.dto';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get()
  async getReservations(): Promise<Reservation[]> {
    try {
      const reservations = await this.reservationService.getAllReservations();
      return reservations;
    } catch (error) {
      throw new Error(`Failed to fetch reservations: ${error.message}`);
    }
  }
  @Get(':id')
  async getReservationById(@Param('id') id: string): Promise<Reservation> {
    try {
      const reservation = await this.reservationService.getReservationById(id);
      if (!reservation) {
        throw new Error(`Reservation with id ${id} not found`);
      }
      return reservation;
    } catch (error) {
      throw new Error(`Failed to fetch reservation: ${error.message}`);
    }
  }
  @Get('customer/:phone')
  async getCustomerReservations(@Param('phone') phone: string): Promise<Reservation[]> {
    try {
      const reservations = await this.reservationService.getReservationsByCustomerPhone(phone);
      return reservations;
    } catch (error) {
      throw new Error(`Failed to fetch customer reservations: ${error.message}`);
    }
  }
  @Post()
  async createReservation(@Body() reservationData: CreateReservationRequest): Promise<void> {
    try {
      const reservation = Reservation.from({
        ...reservationData,
        startTime: new Date(reservationData.startTime),
        endTime: new Date(reservationData.endTime),
        createAt: new Date(),
      });

      await this.reservationService.createReservation(reservation);
    } catch (error) {
      throw new Error(`Failed to create reservation: ${error.message}`);
    }
  }

  @Patch(':id')
  async updateReservation(@Param('id') id: string, @Body() reservationData: Partial<Reservation>): Promise<void> {
    try {
      await this.reservationService.updateReservation(id, reservationData);
    } catch (err) {
      throw new Error(`Failed to update reservation: ${err.message}`);
    }
  }

  @Delete(':id')
  async deleteReservation(@Param('id') id: string): Promise<void> {
    try {
      await this.reservationService.deleteReservation(id);
    } catch (err) {
      throw new Error(`Failed to delete reservation: ${err.message}`);
    }
  }
}
