import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class ClienteService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly authService: AuthService,
  ) {}

  async createCliente(createClienteDto: CreateClienteDto) {
    const cliente = await this.prismaService.cliente.findFirst({
      where: { cpf: createClienteDto.cpf },
    });

    if (cliente) {
      throw new BadRequestException('O CPF informado já está cadastrado');
    }

    const matricula = await this.prismaService.matricula.findFirst({
      where: { matricula: createClienteDto.numeroMatricula },
    });

    if (matricula) {
      throw new BadRequestException(
        'O número de matrícula informado já está cadastrado',
      );
    }

    const categoria = await this.prismaService.categoria.findFirst({
      where: { id: createClienteDto.idCategoria },
    });

    if (!categoria) {
      throw new BadRequestException('A categoria informada não existe');
    }

    const hashedPass = this.authService.hashPassword(createClienteDto.senha);
    const newCliente = await this.prismaService.cliente.create({
      data: {
        cpf: createClienteDto.cpf,
        email: createClienteDto.email,
        nascimento: createClienteDto.nascimento,
        nome: createClienteDto.nome,
        senha: hashedPass,
        telefone: createClienteDto.telefone,
        Matricula: {
          create: {
            matricula: createClienteDto.numeroMatricula,
            isAtivo: true,
            atualizadoEm: new Date(Date.now()),
          },
        },
        categoria: {
          connect: { id: createClienteDto.idCategoria },
        },
      },
    });

    delete newCliente.id;
    delete newCliente.senha;

    return newCliente;
  }
}
