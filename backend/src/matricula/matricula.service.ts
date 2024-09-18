import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MatriculaService {
  constructor(private readonly prismaService: PrismaService) {}

  async ativarMatricula(matriculaId: string) {
    const matricula = await this.prismaService.matricula.findUnique({
      where: { matricula: matriculaId },
    });

    if (!matricula) {
      throw new NotFoundException('Matrícula não encontrada');
    }

    await this.prismaService.matricula.update({
      where: { matricula: matriculaId },
      data: { isAtivo: true },
    });

    return { message: 'Matrícula ativada com sucesso!' };
  }

  async desativarMatricula(matriculaId: string) {
    const matricula = await this.prismaService.matricula.findUnique({
      where: { matricula: matriculaId },
    });

    if (!matricula) {
      throw new NotFoundException('Matrícula não encontrada');
    }

    await this.prismaService.matricula.update({
      where: { matricula: matriculaId },
      data: { isAtivo: false },
    });

    return { message: 'Matrícula desativada com sucesso!' };
  }
}
