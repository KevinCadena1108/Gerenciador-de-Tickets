import { Controller, UnauthorizedException } from '@nestjs/common';
import { ClienteRepository } from 'src/cliente/cliente.repository';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly clienteRepository: ClienteRepository,
    private readonly authService: AuthService,
  ) {}

  async signIn(cpf: string, password: string) {
    const cliente = await this.clienteRepository.findOne({ cpf });
    const badRequest = new UnauthorizedException('CPF ou senha inválidos');
    if (!cliente) {
      throw badRequest;
    }

    const hashedPassword = cliente.senha;
    const isValidPass = this.authService.verifyHash(password, hashedPassword);
    if (!isValidPass) {
      throw badRequest;
    }

    return {
      id: cliente.id,
      isAdministrador: cliente.isAdministrador,
    };
  }
}
