import { BadRequestException } from '@nestjs/common';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { AuthService } from 'src/auth/auth.service';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { CategoriaRepository } from 'src/categoria/categoria.repository';

@Injectable()
export class ClienteService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly authService: AuthService,
    private readonly categoriaRepository: CategoriaRepository,
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
    delete newCliente.idMatricula;

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
      delete cliente.idMatricula;
      delete cliente.categoria.id;
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
      delete cliente.idMatricula;
    });

    return clientes;
  }

  async getByMatricula(matricula: string) {
    const clientes = await this.prismaService.cliente.findMany({
      where: {
        matricula: {
          matricula: {
            contains: matricula,
            mode: 'insensitive',
          },
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
      delete cliente.idMatricula;
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
      delete cliente.idMatricula;

      return cliente;
    });
  }

  async updateCliente(
    cpf: string,
    updateClienteDto: Partial<UpdateClienteDto>,
  ) {
    const clientes = await this.getByCpf(cpf);
    if (clientes.length === 0) {
      throw new NotFoundException('O cliente não foi encontrado!');
    }

    const cliente = clientes[0];

    if (updateClienteDto.cpf) {
      const cpfExiste = await this.getByCpf(updateClienteDto.cpf);
      if (cpfExiste) {
        throw new BadRequestException('Um cliente com o mesmo CPF já existe!');
      }
    }

    if (updateClienteDto.numeroMatricula) {
      if (cliente.matricula.matricula === updateClienteDto.numeroMatricula)
        return;

      const oldCliente = await this.getByMatricula(
        updateClienteDto.numeroMatricula,
      );
      if (oldCliente.length > 0) {
        throw new BadRequestException(
          'A matrícula já está cadastrada em outro cliente!',
        );
      }
    }

    if (
      updateClienteDto.idCategoria &&
      updateClienteDto.idCategoria !== cliente.idCategoria
    ) {
      const categorias = await this.categoriaRepository.getAll();
      const categoriaExiste = categorias.find(
        (c) => c.id === updateClienteDto.idCategoria,
      );
      if (!categoriaExiste) {
        throw new NotFoundException('A categoria informada não existe!');
      }
    }

    return await this.prismaService.cliente.update({
      where: { cpf },
      data: {
        matricula: {
          update: {
            matricula: {
              set: updateClienteDto.numeroMatricula,
            },
          },
        },
        categoria: {
          update: {
            id: {
              set: updateClienteDto.idCategoria,
            },
          },
        },
        cpf: updateClienteDto.cpf,
        email: updateClienteDto.email,
        nascimento: updateClienteDto.nascimento,
        nome: updateClienteDto.nome,
        telefone: updateClienteDto.telefone,
      },
    });
  }
}
