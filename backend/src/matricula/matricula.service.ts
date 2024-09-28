import { Injectable, NotFoundException } from '@nestjs/common';
import { MatriculaRepository } from './matricula.repository';

@Injectable()
export class MatriculaService {
  constructor(private readonly matriculaRepository: MatriculaRepository) {}

  async ativarMatricula(matricula: string) {
    const oldMatricula =
      await this.matriculaRepository.getOneByMatricula(matricula);

    if (!oldMatricula) {
      throw new NotFoundException('Matrícula não encontrada');
    }

    await this.matriculaRepository.updateByMatricula(matricula, {
      isAtivo: true,
    });

    return { message: 'Matrícula ativada com sucesso!' };
  }

  async desativarMatricula(matricula: string) {
    const oldMatricula =
      await this.matriculaRepository.getOneByMatricula(matricula);

    if (!oldMatricula) {
      throw new NotFoundException('Matrícula não encontrada');
    }

    await this.matriculaRepository.updateByMatricula(matricula, {
      isAtivo: false,
    });

    return { message: 'Matrícula desativada com sucesso!' };
  }
}
