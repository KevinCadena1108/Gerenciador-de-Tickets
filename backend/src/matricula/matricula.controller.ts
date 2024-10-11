import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { MatriculaService } from './matricula.service';
import { AdminGuard } from 'src/auth/guard/admin.guard';
import { JwtGuard } from 'src/auth/guard/jwt.guard';

@Controller('matricula')
@UseGuards(JwtGuard, AdminGuard)
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
