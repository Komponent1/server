import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { /** Write Entity */ } from '../entity';

@Injectable()
export class ScoreService {
  /** Example
  constructor(@InjectRepository(Entity) private scoreRepository: Repository<Entity>) {}

  async createScore(param: Partial<Entity>): Promise<void> {
    const score = Entity.from(param);
    try {
      await this.scoreRepository.save(score);
    } catch (e) {
      throw new Error(e);
    }
  }
  */
}
