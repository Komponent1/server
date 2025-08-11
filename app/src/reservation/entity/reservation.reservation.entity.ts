import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Staff } from './reservation.staff.entity';
import { Nail } from './reservation.nail.entity';

@Entity('reservation')
export class Reservation extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('datetime')
  startTime: Date;

  @Column('datetime')
  endTime: Date;

  @Column('datetime')
  createAt: Date;

  @Column()
  phone: string;

  @Column()
  name: string;

  @Column()
  staffId: string;

  @Column()
  nailId: string;

  @ManyToOne(() => Staff, staff => staff)
  @JoinColumn({ name: 'staffId' })
  staff: Staff;

  @ManyToOne(() => Nail, nail => nail)
  @JoinColumn({ name: 'nailId' })
  nail: Nail;

  static from(param: Partial<Reservation>): Reservation {
    const reservation = new Reservation();
    Object.assign(reservation, param);
    return reservation;
  }
}
