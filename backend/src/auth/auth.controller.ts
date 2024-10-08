import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async signIn(cpf: string, password: string) {
    return await this.authService.signIn(cpf, password);
  }
}
