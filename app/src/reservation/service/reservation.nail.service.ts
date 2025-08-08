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

  async getAllNails(): Promise<Nail[]> {
    try {
      return await this.nailRepository.find();
    } catch (e) {
      throw new Error(e);
    }
  }

  async getNailById(id: string): Promise<Nail> {
    try {
      const nail = await this.nailRepository.findOneBy({ id });
      if (!nail) {
        throw new Error(`Nail with id ${id} not found`);
      }
      return nail;
    } catch (e) {
      throw new Error(e);
    }
  }

  async updateNail(id: string, param: Partial<Nail>): Promise<void> {
    try {
      const nail = await this.nailRepository.findOneBy({ id });
      if (!nail) {
        throw new Error(`Nail with id ${id} not found`);
      }
      Object.assign(nail, param);
      await this.nailRepository.save(nail);
    } catch (e) {
      throw new Error(e);
    }
  }

  async deleteNail(id: string): Promise<void> {
    try {
      const nail = await this.nailRepository.findOneBy({ id });
      if (!nail) {
        throw new Error(`Nail with id ${id} not found`);
      }
      await this.nailRepository.remove(nail);
    } catch (e) {
      throw new Error(e);
    }
  }
}
