import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Reservation } from '../entity';

@Injectable()
export class ReservationService {
  constructor(@InjectRepository(Reservation) private reservationRepository: Repository<Reservation>) {}

  async createReservation(param: Partial<Reservation>): Promise<void> {
    const reservation = Reservation.from(param);
    try {
      await this.reservationRepository.save(reservation);
    } catch (e) {
      throw new Error(e);
    }
  }

  async getAllReservations(): Promise<Reservation[]> {
    try {
      const reservations = await this.reservationRepository.find({
        relations: ['staff', 'nail'],
      });
      return reservations;
    } catch (e) {
      throw new Error(e);
    }
  }

  async getReservationById(id: string): Promise<Reservation> {
    try {
      const reservation = await this.reservationRepository.findOne({
        where: { id },
        relations: ['staff', 'nail'],
      });
      if (!reservation) {
        throw new Error(`Reservation with id ${id} not found`);
      }
      return reservation;
    } catch (e) {
      throw new Error(e);
    }
  }
  async getReservationsByCustomerPhone(phone: string): Promise<Reservation[]> {
    try {
      const reservations = await this.reservationRepository.find({
        where: { phone: phone },
        relations: ['staff', 'nail'],
      });
      return reservations;
    } catch (e) {
      throw new Error(e);
    }
  }
  async getReservationsByStaffId(staffId: string): Promise<Reservation[]> {
    try {
      const reservations = await this.reservationRepository.find({
        where: { staff: { id: staffId } },
        relations: ['staff', 'nail'],
      });
      return reservations;
    } catch (e) {
      throw new Error(e);
    }
  }

  async updateReservation(id: string, param: Partial<Reservation>): Promise<void> {
    try {
      const reservation = await this.getReservationById(id);
      Object.assign(reservation, param);
      await this.reservationRepository.save(reservation);
    } catch (e) {
      throw new Error(e);
    }
  }

  async deleteReservation(id: string): Promise<void> {
    try {
      const reservation = await this.getReservationById(id);
      await this.reservationRepository.remove(reservation);
    } catch (e) {
      throw new Error(e);
    }
  }
}
