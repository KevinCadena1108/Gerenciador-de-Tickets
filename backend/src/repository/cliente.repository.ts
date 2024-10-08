import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ClienteRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(where: Prisma.ClienteWhereUniqueInput) {
    return await this.prismaService.cliente.findUnique({
      where,
      include: { matricula: true, categoria: true },
      relationLoadStrategy: 'join',
    });
  }

  async findMany(where: Prisma.ClienteWhereInput) {
    return await this.prismaService.cliente.findMany({
      where,
      include: {
        matricula: true,
        categoria: true,
      },
      relationLoadStrategy: 'join',
    });
  }

  async getAll() {
    return await this.findMany({});
  }

  async getOneByCPF(cpf: string) {
    return await this.findOne({ cpf });
  }

  async getManyByCPF(cpf: string) {
    return await this.findMany({
      cpf: { contains: cpf, mode: 'insensitive' },
    });
  }

  async getManyByMatricula(matricula: string) {
    return await this.findMany({
      matricula: { matricula: { contains: matricula, mode: 'insensitive' } },
    });
  }

  async getManyByNome(nome: string) {
    return await this.findMany({
      nome: { contains: nome, mode: 'insensitive' },
    });
  }

  async create(data: Prisma.ClienteCreateInput) {
    return await this.prismaService.cliente.create({ data });
  }

  async update(data: Prisma.ClienteUpdateInput, where: Prisma.ClienteWhereUniqueInput) {
    return await this.prismaService.cliente.update({ data, where });
  }
}
