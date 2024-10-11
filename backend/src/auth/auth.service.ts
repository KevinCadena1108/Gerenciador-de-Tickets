import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomBytes, scryptSync, createHash } from 'crypto';
import { ClienteRepository } from 'src/repository/cliente.repository';
import { SignInDto } from './dto/signin.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly clienteRepository: ClienteRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signIn(dto: SignInDto) {
    const { cpf, senha } = dto;
    const cliente = await this.clienteRepository.findOne({ cpf });
    const badRequest = new UnauthorizedException('CPF ou senha inválidos');
    if (!cliente) throw badRequest;

    const hashedPassword = cliente.senha;
    const isValidPass = this.verifyHash(senha, hashedPassword);
    if (!isValidPass) throw badRequest;

    const adm = cliente.isAdministrador;
    return { token: this.signToken(cliente.id, adm), administrador: adm };
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

  signToken(userId: number, isAdministrador: boolean) {
    const payload = {
      sub: userId,
      administrador: isAdministrador,
    };

    const secret = this.configService.getOrThrow<string>('JWT_SECRET');
    return this.jwtService.sign(payload, { expiresIn: '1h', secret });
  }
}
