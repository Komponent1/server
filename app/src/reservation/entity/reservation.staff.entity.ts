import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Owner } from './reservation.owner.entity';

@Entity('staff')
export class Staff extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  ownerUid: string;
  @ManyToOne(() => Owner, owner => owner)
  @JoinColumn({ name: 'ownerUid' })
  owner: Owner;

  static from(param: Partial<Staff>): Staff {
    const staff = new Staff();
    Object.assign(staff, param);
    return staff;
  }
}
