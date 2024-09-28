import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriaRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll() {
    return await this.prismaService.categoria.findMany();
  }

  async getById(id: number) {
    return await this.prismaService.categoria.findUnique({ where: { id } });
  }
}
