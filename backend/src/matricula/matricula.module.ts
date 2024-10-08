import { Module } from '@nestjs/common';
import { MatriculaController } from './matricula.controller';
import { MatriculaService } from './matricula.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RepositoryModule } from 'src/repository/repository.module';

@Module({
  controllers: [MatriculaController],
  providers: [MatriculaService],
  imports: [PrismaModule, RepositoryModule],
})
export class MatriculaModule {}
