import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() dto: SignInDto, @Res({passthrough: true}) res: Response) {
    const auth = await this.authService.signIn(dto);
    res.setHeader('Authorization', `Bearer ${auth.token}`)
    return auth
  }
}
