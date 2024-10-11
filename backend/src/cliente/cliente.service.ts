import { BadRequestException } from '@nestjs/common';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { AuthService } from 'src/auth/auth.service';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { CategoriaRepository } from 'src/repository/categoria.repository';
import { ClienteRepository } from '../repository/cliente.repository';
import { MatriculaRepository } from 'src/repository/matricula.repository';
import { Prisma } from '@prisma/client';

@Injectable()
export class ClienteService {
  constructor(
    private readonly authService: AuthService,
    private readonly categoriaRepository: CategoriaRepository,
    private readonly matriculaRepository: MatriculaRepository,
    private readonly clienteRepository: ClienteRepository,
  ) {}

  async createCliente(createClienteDto: CreateClienteDto) {
    const { cpf, numeroMatricula, idCategoria } = createClienteDto;

    const cliente = await this.clienteRepository.getOneByCPF(cpf);
    if (cliente) {
      throw new BadRequestException('O CPF informado já está cadastrado');
    }

    const matricula = await this.matriculaRepository.getOneByMatricula(numeroMatricula);
    if (matricula) {
      throw new BadRequestException('O número de matrícula informado já está cadastrado');
    }

    const categoria = await this.categoriaRepository.getById(idCategoria);
    if (!categoria) {
      throw new BadRequestException('A categoria informada não existe');
    }

    const hashedPass = this.authService.hashPassword(createClienteDto.senha);
    const newCliente = await this.clienteRepository.create({
      cpf: createClienteDto.cpf,
      email: createClienteDto.email,
      nascimento: createClienteDto.nascimento,
      nome: createClienteDto.nome,
      senha: hashedPass,
      telefone: createClienteDto.telefone,
      isAdministrador: createClienteDto.administrador,
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
    });

    delete newCliente.id;
    delete newCliente.senha;
    delete newCliente.idMatricula;

    return newCliente;
  }

  async getAll() {
    const clientes = await this.clienteRepository.getAll();

    return clientes.map((cliente) => {
      delete cliente.id;
      delete cliente.senha;
      delete cliente.idCategoria;
      delete cliente.idMatricula;
      return cliente;
    });
  }

  async searchByCPF(cpf: string) {
    const cliente = await this.clienteRepository.findOne({ cpf });
    if (!cliente) throw new NotFoundException('Não existe nenhum cliente com este CPF!');

    delete cliente.id;
    delete cliente.senha;
    delete cliente.idCategoria;
    delete cliente.idMatricula;
    delete cliente.matricula.id;

    return cliente;
  }

  async searchMany(where: Prisma.ClienteWhereInput) {
    const clientes = await this.clienteRepository.findMany(where);

    clientes.forEach((cliente) => {
      delete cliente.id;
      delete cliente.senha;
      delete cliente.idCategoria;
      delete cliente.idMatricula;
      delete cliente.matricula.id;
    });

    return clientes;
  }

  async getManyByCpf(cpf: string) {
    const clientes = await this.clienteRepository.getManyByCPF(cpf);

    clientes.forEach((cliente) => {
      delete cliente.id;
      delete cliente.senha;
      delete cliente.idCategoria;
      delete cliente.idMatricula;
      delete cliente.matricula.id;
    });

    return clientes;
  }

  async getManyByMatricula(matricula: string) {
    const clientes = await this.clienteRepository.getManyByMatricula(matricula);

    clientes.forEach((cliente) => {
      delete cliente.id;
      delete cliente.senha;
      delete cliente.idCategoria;
      delete cliente.idMatricula;
      delete cliente.matricula.id;
    });

    return clientes;
  }

  async getByNome(nome: string) {
    const clientes = await this.clienteRepository.getManyByNome(nome);

    return clientes.map((cliente) => {
      delete cliente.id;
      delete cliente.senha;
      delete cliente.idCategoria;
      delete cliente.idMatricula;
      delete cliente.matricula.id;

      return cliente;
    });
  }

  async updateCliente(cpf: string, updateClienteDto: UpdateClienteDto) {
    const cliente = await this.clienteRepository.getOneByCPF(cpf);
    if (!cliente) {
      throw new NotFoundException('O cliente não foi encontrado!');
    }

    if (updateClienteDto.numeroMatricula) {
      if (cliente.matricula.matricula !== updateClienteDto.numeroMatricula) {
        const oldCliente = await this.matriculaRepository.getOneByMatricula(
          updateClienteDto.numeroMatricula,
        );
        if (oldCliente) {
          throw new BadRequestException('A matrícula já está cadastrada em outro cliente!');
        }
      }
    }

    if (updateClienteDto.idCategoria && updateClienteDto.idCategoria !== cliente.idCategoria) {
      const categoriaExiste = await this.categoriaRepository.getById(updateClienteDto.idCategoria);
      if (!categoriaExiste) {
        throw new NotFoundException('A categoria informada não existe!');
      }
    }

    const newSenha = updateClienteDto.senha
      ? this.authService.hashPassword(updateClienteDto.senha)
      : undefined;

    const updateData: any = {
      email: updateClienteDto.email || cliente.email,
      nascimento: updateClienteDto.nascimento || cliente.nascimento,
      nome: updateClienteDto.nome || cliente.nome,
      telefone: updateClienteDto.telefone || cliente.telefone,
      senha: newSenha || cliente.senha,
    };

    if (updateClienteDto.numeroMatricula) {
      updateData.matricula = {
        update: {
          matricula: updateClienteDto.numeroMatricula,
        },
      };
    }

    if (updateClienteDto.idCategoria) {
      updateData.categoria = {
        connect: {
          id: updateClienteDto.idCategoria,
        },
      };
    }

    if (updateClienteDto.administrador) {
      updateData.isAdministrador = {
        update: {
          isAdministrador: updateClienteDto.administrador,
        },
      };
    }

    return await this.clienteRepository.update(updateData, { cpf });
  }
}
