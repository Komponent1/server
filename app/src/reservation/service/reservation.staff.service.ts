import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Staff } from '../entity';

@Injectable()
export class StaffService {
  constructor(@InjectRepository(Staff) private staffRepository: Repository<Staff>) {}

  async createStaff(param: Partial<Staff>): Promise<Staff> {
    const staff = Staff.from(param);
    try {
      return await this.staffRepository.save(staff);
    } catch (e) {
      throw new Error(e);
    }
  }

  async getAllStaffs(): Promise<Staff[]> {
    try {
      return await this.staffRepository.find();
    } catch (e) {
      throw new Error(e);
    }
  }

  async getStaffById(id: string): Promise<Staff> {
    try {
      const staff = await this.staffRepository.findOneBy({ id });
      if (!staff) {
        throw new Error(`Staff with id ${id} not found`);
      }
      return staff;
    } catch (e) {
      throw new Error(e);
    }
  }

  async updateStaff(id: string, param: Partial<Staff>): Promise<void> {
    try {
      const staff = await this.getStaffById(id);
      Object.assign(staff, param);
      await this.staffRepository.save(staff);
    } catch (e) {
      throw new Error(e);
    }
  }

  async deleteStaff(id: string): Promise<void> {
    try {
      const staff = await this.staffRepository.findOneBy({ id });
      if (!staff) {
        throw new Error(`Staff with id ${id} not found`);
      }
      await this.staffRepository.remove(staff);
    } catch (e) {
      throw new Error(e);
    }
  }
}
