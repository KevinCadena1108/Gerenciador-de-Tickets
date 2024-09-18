import { Module } from '@nestjs/common';
import { MatriculaController } from './matricula.controller';
import { MatriculaService } from './matricula.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [MatriculaController],
  providers: [MatriculaService],
  imports: [PrismaModule],
})
export class MatriculaModule {}
