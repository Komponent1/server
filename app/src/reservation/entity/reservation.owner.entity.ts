import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('owner')
export class Owner extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  uid: string;

  @Column()
  name: string;

  @Column()
  password: string;

  static from(param: Partial<Owner>): Owner {
    const owner = new Owner();
    Object.assign(owner, param);
    return owner;
  }
}