import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Staff } from './reservation.staff.entity';
import { Nail } from './reservation.nail.entity';
import { Owner } from './reservation.owner.entity';

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
  @ManyToOne(() => Staff, staff => staff)
  @JoinColumn({ name: 'staffId' })
  staff: Staff;

  
  @Column()
  nailId: string;
  @ManyToOne(() => Nail, nail => nail)
  @JoinColumn({ name: 'nailId' })
  nail: Nail;
  
  @Column()
  ownerUid: string;
  @ManyToOne(() => Owner, owner => owner)
  @JoinColumn({ name: 'ownerUid' })
  owner: Owner;

  static from(param: Partial<Reservation>): Reservation {
    const reservation = new Reservation();
    Object.assign(reservation, param);
    return reservation;
  }
}
