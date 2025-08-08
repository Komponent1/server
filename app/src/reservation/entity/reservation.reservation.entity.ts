import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Staff } from './reservation.staff.entity';
import { Nail } from './reservation.nail.entity';

@Entity('reservation')
export class Reservation extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: string;

  @Column()
  createAt: string;

  @Column()
  phone: string;

  @Column()
  name: string;

  @ManyToOne(() => Staff, staff => staff)
  staff: Staff[];

  @ManyToOne(() => Nail, nail => nail)
  nail: Nail[];

  static from(param: Partial<Reservation>): Reservation {
    const reservation = new Reservation();
    Object.assign(reservation, param);
    return reservation;
  }
}
