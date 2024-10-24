import { Module } from '@nestjs/common';
import { ImagemController } from './imagem.controller';
import { ImagemService } from './imagem.service';
import { RepositoryModule } from 'src/repository/repository.module';

@Module({
  controllers: [ImagemController],
  providers: [ImagemService],
  imports: [RepositoryModule],
})
export class ImagemModule {}
