import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../service/reservation.auth.service';
import { PostLoginReq, PostOwnerReq } from '../dto/reservation.dto';

@Controller('reservation/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: PostLoginReq): Promise<{ access_token: string, name: string, uid: string}> {
    try {
      const { access_token, name } = await this.authService.login(body.uid, body.pw);
      return { access_token, name, uid: body.uid };
    } catch (err) {
      throw new UnauthorizedException();
    }
    
  }

  @Post('register')
  async register(@Body() body: PostOwnerReq): Promise<{ uid: string; name: string }> {
    try {
      const owner = await this.authService.createOwner(body.uid, body.name, body.pw);
      return { uid: owner.uid, name: owner.name };
    } catch (err) {
      throw new Error('Registration failed');
    }

  }
}