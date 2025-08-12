import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Owner } from '../entity';
import { Repository } from 'typeorm';
import {} from 'crypto';
import { encrypt } from '../util/encryption';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Owner) private ownerRepository: Repository<Owner>,
    private jwtService: JwtService,
  ) {}

  async createOwner(uid: string, name: string, pw: string): Promise<Owner> {
    const owner = new Owner();
    owner.uid = uid;
    owner.name = name;
    owner.password = await encrypt(pw);
    const savedOwner = await this.ownerRepository.save(owner);
    return savedOwner;
  }

  async login(uid: string, password: string): Promise<{ access_token: string, name: string }> {
    try {
      const owner = await this.ownerRepository.findOne({ where: { uid } });
      if (owner && (await compare(password, owner.password))) {
        const token = await this.generateToken(owner);
        return { access_token: token, name: owner.name };
      }
      throw new Error('Invalid credentials');
    } catch (e) {
      throw new Error(e);
    }
  }

  private async generateToken(owner: Owner): Promise<string> {
    const payload = { uid: owner.uid, name: owner.name };
    return await this.jwtService.signAsync(payload);
  }
}