import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('staff')
export class Staff extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  static from(param: Partial<Staff>): Staff {
    const staff = new Staff();
    Object.assign(staff, param);
    return staff;
  }
}
