import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  static from(param: Partial<Nail>): Nail {
    const nail = new Nail();
    Object.assign(nail, param);
    return nail;
  }
}
