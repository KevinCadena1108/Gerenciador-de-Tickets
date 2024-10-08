import { Module } from '@nestjs/common';
import { CategoriaController } from './categoria.controller';
import { CategoriaService } from './categoria.service';
import { RepositoryModule } from 'src/repository/repository.module';

@Module({
  controllers: [CategoriaController],
  providers: [CategoriaService],
  imports: [RepositoryModule],
})
export class CategoriaModule {}
