import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomBytes, scryptSync, createHash } from 'crypto';
import { ClienteRepository } from 'src/cliente/cliente.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly clienteRepository: ClienteRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(cpf: string, password: string) {
    const cliente = await this.clienteRepository.findOne({ cpf });
    const badRequest = new UnauthorizedException('CPF ou senha inválidos');
    if (!cliente) {
      throw badRequest;
    }

    const hashedPassword = cliente.senha;
    const isValidPass = this.verifyHash(password, hashedPassword);
    if (!isValidPass) {
      throw badRequest;
    }

    const payload = { sub: cliente.id, isAdministrador: cliente.isAdministrador };
    return { access_token: await this.jwtService.signAsync(payload) };
  }

  hashPassword(password: string, passwordSalt?: string): string {
    const salt = passwordSalt ?? randomBytes(32).toString('hex');
    const pepper = createHash('sha256').update(password).digest('hex');
    const saltedPepper = `${salt}#${pepper}`;

    const hash = scryptSync(password, saltedPepper, 40).toString('hex');
    return `${salt}.${hash}`;
  }

  verifyHash(password: string, hashedPass: string): boolean {
    const [salt, hash] = hashedPass.split('.');
    const [oldSalt, oldHash] = this.hashPassword(password, salt).split('.');
    return salt === oldSalt && hash === oldHash;
  }
}
