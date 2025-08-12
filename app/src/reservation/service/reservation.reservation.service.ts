import { Between, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Reservation } from '../entity';
import { ReservationNotFoundError, UnknownError } from '../exception/reservation.exception';
import { KOR_TIME_OFFSET } from '../reservation.constant';

@Injectable()
export class ReservationService {
  constructor(@InjectRepository(Reservation) private reservationRepository: Repository<Reservation>) {}

  async createReservation(reservation: Reservation): Promise<void> {
    try {
      const res = await this.reservationRepository.save(reservation);
    } catch (e) {
      throw new UnknownError(`Failed to createReservation: ${e.message}`);
    }
  }

  async getAllReservations({ownerUid}: {ownerUid: string}): Promise<Reservation[]> {
    try {
      const reservations = await this.reservationRepository.find({
        relations: ['staff', 'nail'],
        where: { ownerUid },
      });
      return reservations;
    } catch (e) {
      throw new UnknownError(`Failed to getAllReservations: ${e.message}`);
    }
  }
  async getReservationsByMonth({date, ownerUid}: {date: Date, ownerUid: string}): Promise<Reservation[]> {
    try {
      const reservations = await this.reservationRepository.find({
        relations: ['staff', 'nail'],
        where: {
          ownerUid,
          startTime: Between(
            new Date(date.getFullYear(), date.getMonth(), 1),
            new Date(date.getFullYear(), date.getMonth() + 1, 0)
          ),
        },
      });
      return reservations;
    } catch (e) {
      throw new UnknownError(`Failed to getReservationsByMonth: ${e.message}`);
    }
  }
  async getReservationsByWeek({date, ownerUid}: {date: Date, ownerUid: string}): Promise<Reservation[]> {
    try {
      const startOfWeek = new Date(date);
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(endOfWeek.getDate() + 6);

      const reservations = await this.reservationRepository.find({
        relations: ['staff', 'nail'],
        where: {
          startTime: Between(startOfWeek, endOfWeek),
          ownerUid,
        },
      });
      return reservations;
    } catch (e) {
      throw new UnknownError(`Failed to getReservationsByWeek: ${e.message}`);
    }
  }
  async getReservationsByDate({date, ownerUid}: {date: Date, ownerUid: string}): Promise<Reservation[]> {
    try {
      const korStartTime = new Date(date.getTime() - KOR_TIME_OFFSET);
      const korEndTime = new Date(date.getTime() - KOR_TIME_OFFSET + 24 * 60 * 60 * 1000);

      const reservations = await this.reservationRepository.find({
        relations: ['staff', 'nail'],
        where: { startTime: Between(korStartTime, korEndTime), ownerUid },
      });
      return reservations;
    } catch (e) {
      throw new UnknownError(`Failed to getReservationsByDate: ${e.message}`);
    }
  }

  async getReservationById({reservationId}: {reservationId: string}): Promise<Reservation> {
    try {
      const reservation = await this.reservationRepository.findOne({
        where: { id: reservationId },
        relations: ['staff', 'nail'],
      });
      if (!reservation) {
        throw new ReservationNotFoundError();
      }
      return reservation;
    } catch (e) {
      throw new UnknownError(`Failed to getReservationById: ${e.message}`);
    }
  }
  async getReservationsByCustomerPhoneWithOnwer({ownerUid, phone}: {ownerUid: string, phone: string}): Promise<Reservation[]> {
    try {
      const reservations = await this.reservationRepository.find({
        where: { phone: phone, ownerUid: ownerUid },
        relations: ['staff', 'nail'],
      });
      return reservations;
    } catch (e) {
      throw new UnknownError(`Failed to getReservationsByCustomerPhone: ${e.message}`);
    }
  }
  async getReservationsByCustomerPhone({phone}: {phone: string}): Promise<Reservation[]> {
    try {
      const reservations = await this.reservationRepository.find({
        where: { phone: phone },
        relations: ['staff', 'nail'],
      });
      return reservations;
    } catch (e) {
      throw new UnknownError(`Failed to getReservationsByCustomerPhone: ${e.message}`);
    }
  }
  async getReservationsByStaffId({staffId}: {staffId: string}): Promise<Reservation[]> {
    try {
      const reservations = await this.reservationRepository.find({
        where: { staff: { id: staffId } },
        relations: ['staff', 'nail'],
      });
      return reservations;
    } catch (e) {
      throw new UnknownError(`Failed to getReservationsByStaffId: ${e.message}`);
    }
  }

  async updateReservationById({reservationId}: {reservationId: string}, param: Partial<Reservation>): Promise<void> {
    try {
      const reservation = await this.getReservationById({reservationId});
      Object.assign(reservation, param);
      await this.reservationRepository.save(reservation);
    } catch (e) {
      throw new UnknownError(`Failed to updateReservation: ${e.message}`);
    }
  }

  async deleteReservation({reservationId}: {reservationId: string}): Promise<void> {
    try {
      const reservation = await this.getReservationById({ reservationId});
      await this.reservationRepository.remove(reservation);
    } catch (e) {
      throw new UnknownError(`Failed to deleteReservation: ${e.message}`);
    }
  }
}
