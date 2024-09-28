import { Module } from '@nestjs/common';
import { CategoriaController } from './categoria.controller';
import { CategoriaService } from './categoria.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CategoriaRepository } from './categoria.repository';

@Module({
  controllers: [CategoriaController],
  providers: [CategoriaService, CategoriaRepository],
  imports: [PrismaModule],
  exports: [CategoriaRepository],
})
export class CategoriaModule {}
