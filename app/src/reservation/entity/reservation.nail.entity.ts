import { BaseEntity, Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Owner } from './reservation.owner.entity';

@Entity('nail')
export class Nail extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({unique: true})
  name: string;

  @Column()
  price: number;
  
  @Column()
  spendMinute: number;

  @Column()
  ownerUid: string;
  @ManyToOne(() => Owner, owner => owner)
  @JoinColumn({ name: 'ownerUid' })
  owner: Owner;

  static from(param: Partial<Nail>): Nail {
    const nail = new Nail();
    Object.assign(nail, param);
    return nail;
  }
}
