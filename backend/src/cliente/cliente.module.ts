import { Module } from '@nestjs/common';
import { ClienteController } from './cliente.controller';
import { ClienteService } from './cliente.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { CategoriaModule } from 'src/categoria/categoria.module';
import { MatriculaModule } from 'src/matricula/matricula.module';
import { ClienteRepository } from './cliente.repository';

@Module({
  controllers: [ClienteController],
  providers: [ClienteService, ClienteRepository],
  exports: [ClienteRepository],
  imports: [PrismaModule, AuthModule, CategoriaModule, MatriculaModule],
})
export class ClienteModule {}
