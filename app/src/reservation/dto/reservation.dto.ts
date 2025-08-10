import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ReservationsResponse {
  @IsString() @IsNotEmpty() id: string;
  @IsString() @IsNotEmpty() date: Date;
  @IsNumber() @IsNotEmpty() phone: number;
  @IsString() @IsNotEmpty() name: string;
  @IsString() @IsNotEmpty() staffName: string;
  @IsString() @IsNotEmpty() nailName: string;
  @IsString() @IsNotEmpty() price: string;
}
export class CreateReservationRequest {
  @ApiProperty() @IsString() @IsNotEmpty() startTime: string;
  @ApiProperty() @IsString() @IsNotEmpty() endTime: string;
  @ApiProperty() @IsString() @IsNotEmpty() phone: string;
  @ApiProperty() @IsString() @IsNotEmpty() name: string;
  @ApiProperty() @IsString() @IsNotEmpty() staffId: string;
  @ApiProperty() @IsString() @IsNotEmpty() nailId: string;
}
