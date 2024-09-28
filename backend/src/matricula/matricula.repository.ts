import { Injectable } from '@nestjs/common';
import { Matricula, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MatriculaRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll(): Promise<Matricula[]> {
    return await this.prismaService.matricula.findMany();
  }

  async getOneByMatricula(matricula: string): Promise<Matricula | null> {
    return await this.prismaService.matricula.findUnique({
      where: { matricula },
    });
  }

  async updateByMatricula(
    matricula: string,
    data: Prisma.MatriculaUpdateInput,
  ) {
    return await this.prismaService.matricula.update({
      where: { matricula },
      data,
    });
  }

  async create(data: Prisma.MatriculaCreateInput) {
    return await this.prismaService.matricula.create({ data });
  }
}
