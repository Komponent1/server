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

  async getAllStaffs({ownerUid}: {ownerUid: string}): Promise<Staff[]> {
    try {
      return await this.staffRepository.find({ where: { ownerUid } });
    } catch (e) {
      throw new Error(e);
    }
  }

  async getStaffById({staffId}: {staffId: string}): Promise<Staff> {
    try {
      const staff = await this.staffRepository.findOneBy({ id: staffId });
      if (!staff) {
        throw new Error(`Staff with id ${staffId} not found`);
      }
      return staff;
    } catch (e) {
      throw new Error(e);
    }
  }

  async updateStaff({ staffId }: { staffId: string }, param: Partial<Staff>): Promise<void> {
    try {
      const staff = await this.getStaffById({ staffId });
      Object.assign(staff, param);
      await this.staffRepository.save(staff);
    } catch (e) {
      throw new Error(e);
    }
  }

  async deleteStaff({ staffId }: { staffId: string }): Promise<void> {
    try {
      const staff = await this.staffRepository.findOneBy({ id: staffId });
      if (!staff) {
        throw new Error(`Staff with id ${staffId} not found`);
      }
      await this.staffRepository.remove(staff);
    } catch (e) {
      throw new Error(e);
    }
  }
}
