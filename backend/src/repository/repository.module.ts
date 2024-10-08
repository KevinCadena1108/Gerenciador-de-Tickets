import { Module } from '@nestjs/common';
import { MatriculaRepository } from './matricula.repository';
import { ClienteRepository } from './cliente.repository';
import { CategoriaRepository } from './categoria.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [MatriculaRepository, ClienteRepository, CategoriaRepository],
  exports: [MatriculaRepository, ClienteRepository, CategoriaRepository],
  imports: [PrismaModule],
})
export class RepositoryModule {}
