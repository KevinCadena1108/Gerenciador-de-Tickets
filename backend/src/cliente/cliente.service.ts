import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
        matricula: {
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

  async getAll() {
    const clientes = await this.prismaService.cliente.findMany({
      relationLoadStrategy: 'join',
      include: {
        matricula: true,
        categoria: true,
      },
    });

    return clientes.map((cliente) => {
      delete cliente.id;
      delete cliente.senha;
      delete cliente.idCategoria;
      delete cliente.categoria.id;

      cliente.matricula.forEach((matricula) => {
        delete matricula.id;
        delete matricula.idCliente;
      });

      return cliente;
    });
  }

  async getByCpf(cpf: string) {
    const clientes = await this.prismaService.cliente.findMany({
      where: { cpf: { contains: cpf, mode: 'insensitive' } },
      include: {
        matricula: true,
        categoria: true,
      },
    });

    clientes.forEach((cliente) => {
      delete cliente.id;
      delete cliente.senha;
      delete cliente.idCategoria;
      delete cliente.categoria.id;

      cliente.matricula.forEach((matricula) => {
        delete matricula.id;
        delete matricula.idCliente;
      });
    });

    return clientes;
  }

  async getByMatricula(matricula: string) {
    const clientes = await this.prismaService.cliente.findMany({
      where: {
        matricula: {
          some: { matricula: { contains: matricula, mode: 'insensitive' } },
        },
      },
      include: {
        matricula: true,
        categoria: true,
      },
    });

    clientes.forEach((cliente) => {
      delete cliente.id;
      delete cliente.senha;
      delete cliente.idCategoria;
      delete cliente.categoria.id;

      cliente.matricula.forEach((matricula) => {
        delete matricula.id;
        delete matricula.idCliente;
      });
    });

    return clientes;
  }

  async getByNome(nome: string) {
    const clientes = await this.prismaService.cliente.findMany({
      where: { nome: { contains: nome, mode: 'insensitive' } },
      include: {
        matricula: true,
        categoria: true,
      },
    });

    return clientes.map((cliente) => {
      delete cliente.id;
      delete cliente.senha;
      delete cliente.idCategoria;
      delete cliente.categoria.id;

      cliente.matricula.forEach((matricula) => {
        delete matricula.id;
        delete matricula.idCliente;
      });

      return cliente;
    });
  }
}
