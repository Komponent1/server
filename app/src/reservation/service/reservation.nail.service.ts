import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Nail } from '../entity';

@Injectable()
export class NailService {
  constructor(@InjectRepository(Nail) private nailRepository: Repository<Nail>) {}

  async createNail(param: Partial<Nail>): Promise<Nail> {
    const nail = Nail.from(param);
    try {
      return await this.nailRepository.save(nail);
    } catch (e) {
      throw new Error(e);
    }
  }

  async getAllNails({ownerUid}: {ownerUid: string}): Promise<Nail[]> {
    try {
      return await this.nailRepository.find({ where: { ownerUid } });
    } catch (e) {
      throw new Error(e);
    }
  }

  async getNailById({nailId}: {nailId: string}): Promise<Nail> {
    try {
      const nail = await this.nailRepository.findOneBy({ id: nailId });
      if (!nail) {
        throw new Error(`Nail with id ${nailId} not found`);
      }
      return nail;
    } catch (e) {
      throw new Error(e);
    }
  }

  async updateNail({nailId}: {nailId: string}, param: Partial<Nail>): Promise<void> {
    try {
      const nail = await this.nailRepository.findOneBy({ id: nailId });
      if (!nail) {
        throw new Error(`Nail with id ${nailId} not found`);
      }
      Object.assign(nail, param);
      await this.nailRepository.save(nail);
    } catch (e) {
      throw new Error(e);
    }
  }

  async deleteNail({nailId}: {nailId: string}): Promise<void> {
    try {
      const nail = await this.nailRepository.findOneBy({ id: nailId });
      if (!nail) {
        throw new Error(`Nail with id ${nailId} not found`);
      }
      await this.nailRepository.remove(nail);
    } catch (e) {
      throw new Error(e);
    }
  }
}
