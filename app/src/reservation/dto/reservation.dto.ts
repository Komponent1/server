import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';
import { Owner } from '../entity';

export class ReservationsResponse {
  @IsString() @IsNotEmpty() id: string;
  @IsString() @IsNotEmpty() date: Date;
  @IsNumber() @IsNotEmpty() phone: number;
  @IsString() @IsNotEmpty() name: string;
  @IsString() @IsNotEmpty() staffName: string;
  @IsString() @IsNotEmpty() nailName: string;
  @IsString() @IsNotEmpty() price: string;
}
export class PostReservationReq {
  @ApiProperty() @IsString() @IsNotEmpty() startTime: string;
  @ApiProperty() @IsString() @IsNotEmpty() endTime: string;
  @ApiProperty() @IsString() @IsNotEmpty() phone: string;
  @ApiProperty() @IsString() @IsNotEmpty() name: string;
  @ApiProperty() @IsString() @IsNotEmpty() staffId: string;
  @ApiProperty() @IsString() @IsNotEmpty() nailId: string;
}
export class PostOwnerReq {
  @ApiProperty() @IsString() @IsNotEmpty() uid: string;
  @ApiProperty() @IsString() @IsNotEmpty() pw: string;
  @ApiProperty() @IsString() @IsNotEmpty() name: string;
}
export class PostLoginReq {
  @ApiProperty() @IsString() @IsNotEmpty() uid: string;
  @ApiProperty() @IsString() @IsNotEmpty() pw: string;
}
export class AuthReq {
  @IsObject() owner: Owner;
}