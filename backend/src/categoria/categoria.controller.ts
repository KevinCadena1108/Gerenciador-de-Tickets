import { Controller, Get, UseGuards } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { AdminGuard } from 'src/auth/guard/admin.guard';
import { JwtGuard } from 'src/auth/guard/jwt.guard';

@Controller('categoria')
@UseGuards(JwtGuard, AdminGuard)
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Get()
  async getAll() {
    return await this.categoriaService.getAll();
  }
}
