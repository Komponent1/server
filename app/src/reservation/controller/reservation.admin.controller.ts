import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import {} from '../exception/reservation.exception';
import { NailService, StaffService, ReservationService } from '../service';
import { Reservation, Nail, Staff } from '../entity';
import { CreateReservationRequest } from '../dto/reservation.dto';

@Controller('reservation/admin')
export class AdminController {
  constructor(
    private readonly reservationService: ReservationService,
    private readonly nailService: NailService,
    private readonly staffService: StaffService
  ) {}

  @Get('reservations')
  async getReservations(): Promise<Reservation[]> {
    try {
      return this.reservationService.getAllReservations();
    } catch (error) {
      throw new Error(`Failed to fetch reservations: ${error.message}`);
    }
  }
  @Get('reservations/month/:month')
  async getReservationsByMonth(@Param('month') month: string): Promise<Reservation[]> {
    try {
      const reservations = await this.reservationService.getAllReservations();
      return reservations.filter(reservation => new Date(reservation.date).getMonth() + 1 === parseInt(month, 10));
    } catch (error) {
      throw new Error(`Failed to fetch reservations for month ${month}: ${error.message}`);
    }
  }

  @Get('reservation/:id')
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

  @Get('reservations/customer/:id')
  async getCustomerReservations(@Param('id') id: string): Promise<Reservation[]> {
    try {
      const reservations = await this.reservationService.getAllReservations();
      return reservations.filter(reservation => reservation.id === id);
    } catch (error) {
      throw new Error(`Failed to fetch customer reservations: ${error.message}`);
    }
  }
  @Get('reservations/staff/:id')
  async getStaffReservations(@Param('id') id: string): Promise<Reservation[]> {
    try {
      const reservations = await this.reservationService.getReservationsByStaffId(id);
      return reservations;
    } catch (error) {
      throw new Error(`Failed to fetch staff reservations: ${error.message}`);
    }
  }

  @Post('reservation')
  async createReservation(@Body() reservationData: CreateReservationRequest): Promise<void> {
    try {
      const reservation = Reservation.from(reservationData);
      reservation.date = new Date(reservationData.date).toString();
      reservation.createAt = new Date().toString();
      reservation.phone = reservationData.phone;

      await this.reservationService.createReservation(reservation);
    } catch (error) {
      throw new Error(`Failed to create reservation: ${error.message}`);
    }
  }

  @Patch('reservation/:id')
  async updateReservation(@Param('id') id: string, @Body() reservationData: Partial<Reservation>): Promise<void> {
    try {
      await this.reservationService.updateReservation(id, reservationData);
    } catch (err) {
      throw new Error(`Failed to update reservation: ${err.message}`);
    }
  }

  @Delete('reservation/:id')
  async deleteReservation(@Param('id') id: string): Promise<void> {
    try {
      await this.reservationService.deleteReservation(id);
    } catch (err) {
      throw new Error(`Failed to delete reservation: ${err.message}`);
    }
  }
  @Get('nails')
  async getAllNails(): Promise<Nail[]> {
    try {
      return this.nailService.getAllNails();
    } catch (error) {
      throw new Error(`Failed to fetch nails: ${error.message}`);
    }
  }
  @Get('staffs')
  async getAllStaffs(): Promise<Staff[]> {
    try {
      return this.staffService.getAllStaffs();
    } catch (error) {
      throw new Error(`Failed to fetch staff: ${error.message}`);
    }
  }
  @Get('nail/:id')
  async getNailById(@Param('id') id: string): Promise<Nail> {
    try {
      return this.nailService.getNailById(id);
    } catch (error) {
      throw new Error(`Failed to fetch nail: ${error.message}`);
    }
  }
  @Get('staff/:id')
  async getStaffById(@Param('id') id: string): Promise<Staff> {
    try {
      return this.staffService.getStaffById(id);
    } catch (error) {
      throw new Error(`Failed to fetch staff: ${error.message}`);
    }
  }
  @Patch('nail/:id')
  async updateNail(@Param('id') id: string, @Body() nailData: Partial<Nail>): Promise<void> {
    try {
      await this.nailService.updateNail(id, nailData);
    } catch (error) {
      throw new Error(`Failed to update nail: ${error.message}`);
    }
  }
  @Patch('staff/:id')
  async updateStaff(@Param('id') id: string, @Body() staffData: Partial<Staff>): Promise<void> {
    try {
      await this.staffService.updateStaff(id, staffData);
    } catch (error) {
      throw new Error(`Failed to update staff: ${error.message}`);
    }
  }

  @Post('nail')
  async createNail(@Body() nailData: Partial<Nail>): Promise<Nail> {
    try {
      return this.nailService.createNail(nailData);
    } catch (error) {
      throw new Error(`Failed to create nail: ${error.message}`);
    }
  }

  @Post('staff')
  async createStaff(@Body() staffData: Partial<Staff>): Promise<Staff> {
    try {
      return this.staffService.createStaff(staffData);
    } catch (error) {
      throw new Error(`Failed to create staff: ${error.message}`);
    }
  }
}
