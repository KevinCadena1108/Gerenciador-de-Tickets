import { Module } from '@nestjs/common';
import { MatriculaController } from './matricula.controller';
import { MatriculaService } from './matricula.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MatriculaRepository } from './matricula.repository';

@Module({
  controllers: [MatriculaController],
  providers: [MatriculaService, MatriculaRepository],
  imports: [PrismaModule],
  exports: [MatriculaRepository],
})
export class MatriculaModule {}
