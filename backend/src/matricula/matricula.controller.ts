import { Controller, Param, Post } from '@nestjs/common';
import { MatriculaService } from './matricula.service';

@Controller('matricula')
export class MatriculaController {
  constructor(private readonly matriculaService: MatriculaService) {}

  @Post('/ativar/:id')
  async ativarMatricula(@Param('id') matriculaId: string) {
    return await this.matriculaService.ativarMatricula(matriculaId);
  }

  @Post('/desativar/:id')
  async desativarMatricula(@Param('id') matriculaId: string) {
    return await this.matriculaService.desativarMatricula(matriculaId);
  }
}
