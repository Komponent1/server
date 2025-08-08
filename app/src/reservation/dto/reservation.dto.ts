import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ReservationsResponse {
  @IsString() @IsNotEmpty() id: string;
  @IsString() @IsNotEmpty() date: string;
  @IsNumber() @IsNotEmpty() phone: number;
  @IsString() @IsNotEmpty() name: string;
  @IsString() @IsNotEmpty() staffName: string;
  @IsString() @IsNotEmpty() nailName: string;
  @IsString() @IsNotEmpty() price: string;
}
export class CreateReservationRequest {
  @IsString() @IsNotEmpty() date: string;
  @IsString() @IsNotEmpty() phone: string;
  @IsString() @IsNotEmpty() name: string;
  @IsString() @IsNotEmpty() staffId: string;
  @IsString() @IsNotEmpty() nailId: string;
}
