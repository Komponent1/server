import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../service/reservation.auth.service';
import { Owner } from '../entity';

@Controller('reservation/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: { uid: string, pw: string }): Promise<{ access_token: string, name: string, uid: string}> {
    try {
      const { access_token, name } = await this.authService.login(loginDto.uid, loginDto.pw);
      return { access_token, name, uid: loginDto.uid };
    } catch {
      throw new UnauthorizedException();
    }
    
  }

  @Post('register')
  async register(@Body() registerDto: {uid: string, name: string, pw: string}): Promise<{id: string; name: string}> {
    try {
      const owner = await this.authService.createOwner(registerDto.uid, registerDto.name, registerDto.pw);
      return { id: owner.id, name: owner.name };
    } catch (err) {
      throw new Error('Registration failed');
    }

  }
}