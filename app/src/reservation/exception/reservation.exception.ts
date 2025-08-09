import { NotFoundException, HttpException, HttpStatus } from '@nestjs/common';

export class UnknownError extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
export class ReservationNotFoundError extends NotFoundException {
  constructor() {
    super('Reservation not found');
  }
}
